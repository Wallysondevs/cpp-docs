# std::streamsize

Definido no cabeçalho `[<ios>](<#/doc/header/ios>)`

```c
typedef /*implementation-defined*/ streamsize;
```

  
O tipo `std::streamsize` é um tipo integral com sinal usado para representar o número de caracteres transferidos em uma operação de E/S ou o tamanho de um buffer de E/S. Ele é usado como uma contraparte com sinal de [std::size_t](<#/doc/types/size_t>), similar ao tipo POSIX `ssize_t`. 

### Notas

Exceto nos construtores de [std::strstreambuf](<#/doc/io/strstreambuf>), valores negativos de `std::streamsize` nunca são usados. 

### Exemplo

Execute este código
```cpp 
    #include <iostream>
    #include <type_traits>
     
    static_assert(std::is_signed_v<std::streamsize>);
     
    int main()
    {
        std::cout << sizeof(std::streamsize) << '\n';
    }
```

Saída possível: 
```
    8
```

### Veja também

[ gcount](<#/doc/io/basic_istream/gcount>) |  retorna o número de caracteres extraídos pela última operação de entrada não formatada   
(função membro pública de `std::basic_istream<CharT,Traits>`)  
[ ignore](<#/doc/io/basic_istream/ignore>) |  extrai e descarta caracteres até que o caractere fornecido seja encontrado   
(função membro pública de `std::basic_istream<CharT,Traits>`)  
[ read](<#/doc/io/basic_istream/read>) |  extrai blocos de caracteres   
(função membro pública de `std::basic_istream<CharT,Traits>`)  
[ write](<#/doc/io/basic_ostream/write>) |  insere blocos de caracteres   
(função membro pública de `std::basic_ostream<CharT,Traits>`)