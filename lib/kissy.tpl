<% if(style == "code"){ %>
   <% = code%>
<% }else{ %>
    <% if(package){ %>
        KISSY.add("<%=package%>",function(S ,require,exports,module) {
    <% }else{ %>
        KISSY.add(function(S ,require,exports,module) {
    <% } %>
       <% = code%>
       });
<% } %>