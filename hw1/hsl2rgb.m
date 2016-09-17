function [rgb] = hsl2rgb( hsl)
% hsl2rgb Transfer color from hsl coordinate system to rgb color system.
%
% The implementation is based on the implemention in d3_p0.html
    h=hsl(1);
    s=hsl(2);
    l=hsl(3);
    c=(1-abs(2*l-1))*s;
   
    hp=h*6;
    
    %intermediate value x
    x=c*(1-abs(mod(hp,2)-1));
    
    value=[0 0 0];
    %calculate R,G,B
    if(hp>=0&&hp<1)
        value=[c x 0];
    elseif(hp>=1&&hp<2)
        value=[x c 0];
    elseif(hp>=2&&hp<3)
        value=[0 c x];
    elseif(hp>=3&&hp<4)
        value=[0 x c];
    elseif(hp>=4&&hp<5)
        value=[x 0 c];
    elseif(hp>=5&&hp<6)
        value=[c 0 x];
    end

    %match luminance
    m=l-0.5*c;
    rgb=value+m;
    
end

