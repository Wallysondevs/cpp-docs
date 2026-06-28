# std::filesystem::absolute

Definido no header `[<filesystem>](<#/doc/header/filesystem>)`

```cpp
path absolute( const std::filesystem::path& p );  // (1) (desde C++17)
path absolute( const std::filesystem::path& p, std::error_code& ec );  // (2) (desde C++17)
```

  
Retorna um path que referencia o mesmo local no sistema de arquivos que p, para o qual [`filesystem::path::is_absolute()`](<#/doc/filesystem/path/is_absrel>) é verdadeiro.

2) Esta sobrecarga que não lança exceções retorna um path construído por padrão se ocorrer um erro.

### Parâmetros

p  |  \-  |  path a ser convertido para a forma absoluta   
---|---|---
ec  |  \-  |  parâmetro de saída para relatório de erros na sobrecarga que não lança exceções   
  
### Valor de retorno

Retorna um pathname absoluto (embora não necessariamente canônico) que referencia o mesmo arquivo que p.

### Exceções

Qualquer sobrecarga não marcada como `noexcept` pode lançar [std::bad_alloc](<#/doc/memory/new/bad_alloc>) se a alocação de memória falhar.  

1) Lança [std::filesystem::filesystem_error](<#/doc/filesystem/filesystem_error>) em erros subjacentes da API do SO, construída com p como o primeiro argumento path e o código de erro do SO como o argumento do código de erro.

2) Define um parâmetro [std::error_code](<#/doc/error/error_code>)& para o código de erro da API do SO se uma chamada à API do SO falhar, e executa ec.[`clear`](<#/doc/error/error_code/clear>)() se nenhum erro ocorrer.

### Notas

As implementações são encorajadas a não considerar a não existência de p como um erro.

Para sistemas operacionais baseados em POSIX, std::filesystem::absolute(p) é equivalente a [std::filesystem::current_path](<#/doc/filesystem/current_path>)() / p, exceto quando p é um path vazio.

Para Windows, `std::filesystem::absolute` pode ser implementado como uma chamada para [`GetFullPathNameW`](<https://learn.microsoft.com/en-us/windows/win32/api/fileapi/nf-fileapi-getfullpathnamew>).

### Exemplo

Execute este código
```
    #include <filesystem>
    #include <iostream>
    namespace fs = std::filesystem;
     
    int main()
    {
        std::filesystem::path p = "foo.c";
        std::cout << "Current path is " << std::filesystem::current_path() << '\n';
        std::cout << "Absolute path for " << p << " is " << fs::absolute(p) << '\n';
    }
```

Saída possível: 
```
    Current path is "/tmp/1666297965.0051296"
    Absolute path for "foo.c" is "/tmp/1666297965.0051296/foo.c"
```

### Veja também

[ canonicalweakly_canonical](<#/doc/filesystem/canonical>)(C++17) |  compõe um path canônico   
(função)  
[ relativeproximate](<#/doc/filesystem/relative>)(C++17) |  compõe um path relativo   
(função)