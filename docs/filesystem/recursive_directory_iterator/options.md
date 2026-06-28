# std::filesystem::recursive_directory_iterator::options

[std::filesystem::directory_options](<#/doc/filesystem/directory_options>) options() const; | | (desde C++17)

Retorna as opções que afetam a iteração do diretório. As opções só podem ser fornecidas ao construir o iterador de diretório.

Se o argumento `options` não foi fornecido, retorna [std::filesystem::directory_options::none](<#/doc/filesystem/directory_options>).

### Parâmetros

(nenhum)

### Valor de retorno

As opções efetivas que afetam a iteração do diretório.

### Exceções

Não lança exceções.