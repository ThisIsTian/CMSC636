%% sort by patientID, divide  and sort by date, then split the data into three set{priorTBI,TBI,PostTBI}
% data structure:
% 

%TBI_all=TBI_all(~isnan(TBI_all(:,1)),:);
%TBI_sorted=sort(TBI_all,1);
TBI_sorted=TBI_all;

patient={};
patientNum=1;
while ~isempty(TBI_sorted)
    id=TBI_sorted(1,1);
    selected=TBI_sorted(TBI_sorted(:,1)==id,:);
    TBI_sorted=TBI_sorted(TBI_sorted(:,1)~=id,:);
    
    TBI_sorted_Time=sortrows(selected,2);
    s=struct();
    s.pre={};
    s.cur=[];
    s.post={};
    s.preOrder={};
    s.postOrder={};
    s.id=TBI_sorted_Time(1,1);
    s.order=patientNum;
    patientNum=patientNum+1;

    for i =1:size(TBI_sorted_Time,1)
        
        if TBI_sorted_Time(i,2)<=0 && TBI_sorted_Time(i,4)==0 % less than
            idx_set=find(TBI_sorted_Time(i,7:22));
            if ~isempty(idx_set)
                s.pre=cat(1,s.pre,{idx_set});
                s.preOrder=cat(1,s.preOrder,{-1});
            else
                s.pre=cat(1,s.pre,{0});
                s.preOrder=cat(1,s.preOrder,{-1});
            end
                
        elseif TBI_sorted_Time(i,2)>0 && TBI_sorted_Time(i,4)==0
            
            idx_set=find(TBI_sorted_Time(i,7:22));
            if ~isempty(idx_set)
                s.post=cat(1,s.post,{idx_set});
                s.postOrder=cat(1,s.postOrder,{-1});
            else
                s.post=cat(1,s.post,{0});
                s.postOrder=cat(1,s.postOrder,{-1});
            end
            
        else
            s.cur=find(TBI_sorted_Time(i,7:22));
        end
        
    end
    
    %fix cur hasn't a sympthon error
    if isempty(s.cur)
        s.cur=-1;
    end
    
    patient=cat(1,patient,s);
    
end

%% post process for each id, it's  the first  second  or the third...
categoryId=16;
for i=1:categoryId
    
    for j=1:length(patient)
        
        %increase the order  for  pre.
        order=1;
        
        for k=length(patient{j}.pre):-1:1
            
            if ismember(i,patient{j}.pre{k})
                patient{j}.preOrder{k}=cat(2,patient{j}.preOrder{k},order);
                order=order+1;
            end
        end
        
        patient{j}.preMax{i}=order-1;
        
        order=1;
        
        %increase  the order  for  post
        for k=length(patient{j}.post):-1:1
            
            if ismember(i,patient{j}.post{k})
                patient{j}.postOrder{k}=cat(2,patient{j}.postOrder{k},order);
                order=order+1;
            end
        end
        patient{j}.postMax{i}=order-1;
    end
end
%% save to file
savejson('',patient,'processed.json');
