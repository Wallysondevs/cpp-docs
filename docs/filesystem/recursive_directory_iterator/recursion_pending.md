# std::filesystem::recursive_directory_iterator::recursion_pending

bool recursion_pending() const; |  |  (desde C++17)  

  
Retorna true se o próximo incremento fará com que o diretório atualmente referido por *this seja iterado.

Esta função retorna true imediatamente após a construção ou um incremento. A recursão pode ser desabilitada via [disable_recursion_pending()](<#/doc/filesystem/recursive_directory_iterator/disable_recursion_pending>).

### Parameters

(none)

### Valor de retorno

true se o próximo incremento iterar no diretório atualmente referido, false caso contrário.

### Exceções

Não lança exceções.

### Example

| Esta seção está incompleta
Razão: nenhum exemplo