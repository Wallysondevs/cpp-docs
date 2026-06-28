# std::filesystem::path::make_preferred

```cpp
path& make_preferred();  // (desde C++17)
```

  
Converte todos os separadores de diretório na visualização de formato genérico do path para o separador de diretório preferido. 

Por exemplo, no Windows, onde \ é o separador preferido, o path foo/bar será convertido para foo\bar. 

### Parâmetros

(nenhum) 

### Valor de retorno

*this

### Exceções

Pode lançar exceções definidas pela implementação. 

### Exemplo

O Windows pode usar / como separador, mas prefere \, então make_preferred converte as barras normais (forward slashes) em barras invertidas (backslashes). Por outro lado, o POSIX não usa \ como separador, porque as barras invertidas são caracteres de nome de arquivo válidos — o path do Windows no POSIX na verdade se refere a um arquivo com o nome "a\\\b\\\c". Por esta razão, os "separadores" não são convertidos.

Execute este código
```
    #include <filesystem>
    #include <iostream>
     
    int main()
    {
        std::filesystem::path
            windows_path("a\\b\\c"),
            posix_path("a/b/c");
     
        std::cout
            << "Windows path: "
            << windows_path << " -> "
            << windows_path.make_preferred() << '\n'
            << "POSIX path: "
            << posix_path << " -> "
            << posix_path.make_preferred() << '\n';
    }
```

Saída: 
```
    // on Windows
    Windows path: "a\\b\\c" -> "a\\b\\c"
    POSIX path: "a/b/c" -> "a\\b\\c"
     
    // on POSIX
    Windows path: "a\\b\\c" -> "a\\b\\c"
    POSIX path: "a/b/c" -> "a/b/c"
```

### Veja também

constexpr value_type preferred_separator[static] | separador de diretório alternativo que pode ser usado além do / portátil. No Windows, este é o caractere de barra invertida \. No POSIX, este é o mesmo barra normal / que o separador portátil   
(constante membro estática pública)  