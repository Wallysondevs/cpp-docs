# std::experimental::filesystem::recursive_directory_iterator::recursion_pending

bool recursion_pending() const; | | (filesystem TS)

Retorna true se o próximo incremento fará com que o diretório atualmente referido por *this seja iterado.

Esta função retorna true imediatamente após a construção ou um incremento. A recursão pode ser desabilitada via [disable_recursion_pending()](<#/doc/experimental/fs/recursive_directory_iterator/disable_recursion_pending>).

### Parâmetros

(nenhum)

### Valor de retorno

true se o próximo incremento iterar no diretório atualmente referido, false caso contrário.

### Exceções

Não lança exceções.