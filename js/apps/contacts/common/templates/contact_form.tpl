<form>
    <div class="control-group">
        <label class="control-label" for="contact-firstName">First name:</label>
        <input id="contact-firstName" type="text" name="firstName" value="<%= firstName %>"/>
    </div>
    <div class="control-group">
        <label class="control-label" for="contact-lastName">Last name:</label>
        <input id="contact-lastName" type="text" name="lastName" value="<%= lastName %>"/>
    </div>
    <div class="control-group">
        <label class="control-label" for="contact-phone">Phone:</label>
        <input id="contact-phone" type="text" name="phone" value="<%= phone %>"/>
    </div>
    <button class="btn js-submit">Save</button>
</form>