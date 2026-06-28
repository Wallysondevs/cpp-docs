# std::filesystem::path::compare

```cpp
int compare( const path& p ) const noexcept;  // (1) (desde C++17)
int compare( const string_type& str ) const;
int compare( std::basic_string_view<value_type> str ) const;  // (2) (desde C++17)
int compare( const value_type* s ) const;  // (3) (desde C++17)
```

  
Compara as representações lexicais do path e de outro path.

1) Se root_name().native().compare(p.root_name().native()) for diferente de zero, retorna esse valor.

Caso contrário, se has_root_directory() != p.has_root_directory(), retorna um valor menor que zero se [`has_root_directory()`](<#/doc/filesystem/path/has_path>) for falso e um valor maior que zero caso contrário.

Caso contrário, retorna um valor menor que, igual a ou maior que ​0​ se a porção relativa do path ([`relative_path()`](<#/doc/filesystem/path/relative_path>)) for, respectivamente, lexicograficamente menor que, igual a ou maior que a porção relativa de p (p.relative_path()). A comparação é realizada elemento a elemento, como se iterando ambos os paths de [`begin()`](<#/doc/filesystem/path/begin>) até [`end()`](<#/doc/filesystem/path/begin>) e comparando o resultado de [`native()`](<#/doc/filesystem/path/native>) para cada elemento.

2) Equivalente a compare(path(str)).

3) Equivalente a compare(path(s)).

### Parâmetros

p  |  \-  |  um path para comparar   
---|---|---
str  |  \-  |  uma string ou string view representando o path para comparar   
s  |  \-  |  uma string terminada em nulo representando o path para comparar   
  
### Valor de retorno

Um valor menor que ​0​ se o path for lexicograficamente menor que o path fornecido.

Um valor igual a ​0​ se o path for lexicograficamente igual ao path fornecido.

Um valor maior que ​0​ se o path for lexicograficamente maior que o path fornecido.

### Exceções

2,3) Pode lançar exceções definidas pela implementação.

### Observações

Para comparações bidirecionais, [operadores binários](<#/doc/filesystem/path/operator_cmp>) podem ser mais adequados.

### Exemplo

Execute este código
```
    #include <filesystem>
    #include <iostream>
    #include <string_view>
    namespace fs = std::filesystem;
     
    void demo(fs::path p1, fs::path p2, std::string_view msg)
    {
        std::cout << p1;
        const int rc = p1.compare(p2); 
        if (rc < 0)
            std::cout << " < ";
        else if (rc > 0)
            std::cout << " > ";
        else
            std::cout << " == ";
        std::cout << p2 << " \t: " << msg << '\n';
    }
     
    int main()
    {
        demo("/a/b/", "/a/b/", "simple");
        demo("/a/b/", "/a/b/c", "simple");
        demo("/a/b/../b", "/a/b", "no canonical conversion");
        demo("/a/b", "/a/b/.", "no canonical conversion");
        demo("/a/b/", "a/c", "absolute paths order after relative ones");
    }
```

Saída: 
```
    "/a/b/" == "/a/b/"      : simple
    "/a/b/" < "/a/b/c"	: simple
    "/a/b/../b" > "/a/b"	: no canonical conversion
    "/a/b" < "/a/b/."	: no canonical conversion
    "/a/b/" > "a/c"	        : absolute paths order after relative ones
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 2936](<https://cplusplus.github.io/LWG/issue2936>) | C++17  | comparava todos os elementos do path diretamente  | nome da raiz e diretório raiz tratados separadamente   
  
### Veja também

[ operator==operator!=operator<operator<=operator>operator>=operator<=>](<#/doc/filesystem/path/operator_cmp>)(C++17)(C++17)(ate C++20)(C++17)(ate C++20)(C++17)(ate C++20)(C++17)(ate C++20)(C++17)(ate C++20)(C++20) |  compara lexicograficamente dois paths   
(função)  