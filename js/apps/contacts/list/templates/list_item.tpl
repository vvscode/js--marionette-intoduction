<td><%= firstName %></td>
<td><%= lastName %></td>
<td>
    <button class="btn btn-default js-delete"><i class="glyphicon glyphicon-remove"></i>Delete</button>
    <a href="#contacts/<%= id %>" class="btn btn-default js-show"><i class="glyphicon glyphicon-eye-open"></i>Show</a>
    <a href="#contacts/<%= id %>/edit" class="btn btn-default  js-edit"><span  class="glyphicon glyphicon-pencil"></span>Edit</a>
</td>