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


for i=1:length(mp)
    %0.3~0.5: the radius is set to largest.
    if mp(i)>0.3 && mp(i)<=0.5
        mp(i)=1;
    end
    %From 0.3 to 0: the radius decreases
    if mp(i)<=0.3
        mp(i)= (mp(i)/0.3);%[0,1]
    end
    
    %From 0.5 to 1: the radius decreases.
    if mp(i)>0.5
        mp(i)=(1-mp(i))/0.5;
    end
end

%2, generate color map. for every ratio
hsl_start=[0,0,0];
hsl_end=[0,1,1];
map=[];
for i=0:0.01:1
    hsl_v=(1-i)*hsl_start+i*hsl_end;
    color=hsl2rgb(hsl_v);
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
       hsl_v=(1-mo(i))*hsl_start+mo(i)*hsl_end;
       color=hsl2rgb(hsl_v);
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