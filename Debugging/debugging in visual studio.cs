try
{
    _context.SaveChanges();
}
catch (Exception ex)
{
    // Log the exception details to troubleshoot
    _logger.LogError(ex, "An error occurred while saving changes.");
    throw;
}
