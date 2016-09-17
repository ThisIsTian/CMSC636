m=dlmread('data1.txt');

mo=reshape(m,[],1);
mp=reshape(m,[],1);
%use scatter plot to draw as circle and set color
x=repmat(1:length(m(1,:)),length(m(:,1)),1);
xp=reshape(x,[],1);

y=repmat(1:length(m(:,1)),1,length(m(1,:)));
yp=reshape(y,[],1);

%figure
fig=figure('position',[0,0,600,400]);

%change background color
whitebg(fig,'k');

%1, map FA value to different size.
s=0.3;
e=0.5;

for i=1:length(mp)
    %s~e: the radius is set to largest.
    if mp(i)>s && mp(i)<=e
        mp(i)=1;
        continue;
    end
    %From s to 0: the radius decreases
    if mp(i)<=s
        mp(i)= (mp(i)/s);%[0,1]
        continue;
    end
    
    %From e to 1: the radius decreases.
    if mp(i)>e
        mp(i)=(1-mp(i))/e;
        continue;
    end
end

%2, generate color map. for every ratio
hsl_start=[0,0,0];
hsl_end=[0,1,1];
map=[];
for i=0:0.01:1
    
    %s to e
    if i>s&&i<=e
        color=(1-(i-s)/(e-s))*[0 1 0]+(i-s)/(e-s)*[1 0 0];
    end
    
    %0 to s
    if i<=s
        ratio=i/s;
        ratio=ratio^5;
        color=ratio*[0 1 0]+(1-ratio)*[0.5 0.5 0.5];
    end
    
    %e to 1
    if i>e
        ratio=(1-i)/(1-e);
        ratio=ratio^10;
        %ratio=ratio*ratio;
        color=ratio*[1 0 0]+(1-ratio)*[0.5 0.5 0.5];
    end
    
    map=cat(1,map,color);
end

%Render circles on matlab
%Ref: https://www.mathworks.com/matlabcentral/newsreader/view_thread/251590

%render the points


for i=1:length(mp)
   if(mp(i)~=0)
       c=[xp(i) yp(i)];%center
       r=mp(i);%radius
       pos=[c-r 2*r 2*r];%po
       %hsl_v=(1-mo(i))*hsl_start+mo(i)*hsl_end;
       color=map(int32(mo(i)*100),:);
       h=rectangle('Position',pos,...
       'Curvature',1,...
       'Facecolor',color,...
       'Edgecolor',color);%draw the circle
       
   end
end


%setup x,y range
xlim([0 length(m(1,:))]);
ylim([0 length(m(:,1))]);
xlabel('Width');
ylabel('Height');
set(gca,'fontsize',12,'fontweight','bold');


h=text(210,50,'Fractional Anisotropy (FA)','fontsize',12,'fontweight','bold','Color','white');
set(h,'Rotation',90);
%show color bar
colormap(map);
cm=colorbar;
cm.Color='k';
%scatter(xp(mp~=0),yp(mp~=0),mp(mp~=0)*4,'filled');