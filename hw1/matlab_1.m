
%%
% Ref:http://www.mathworks.com/help/stats/histfit.html

%read data
m=dlmread('data1.txt');

%reshape and removal of zero
mp=reshape(m,1,[]);
mp=mp(mp~=0);

%set figure size
figure('position',[0,0,400,400]);

%fit a histogram
h=histfit(mp,50,'kernel');

%adjust the face color of histogram
h(1).FaceColor=[0.8,0.8,1.0];

%setup the legend, ticks, and labels.
set(gca,'fontsize',15,'fontweight','bold');
set(gca,'YTickLabel',0:0.01:0.06);

xlabel('Fractional Anisotropy (FA)')
ylabel('Ratio');

legend('Bin','Distribution');


