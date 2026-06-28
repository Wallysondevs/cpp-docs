# std::basic_string_view&lt;CharT,Traits&gt;::size, std::basic_string_view&lt;CharT,Traits&gt;::length

```cpp
constexpr size_type size() const noexcept;  // (desde C++17)
constexpr size_type length() const noexcept;  // (desde C++17)
```

  
Retorna o número de elementos `CharT` na view, ou seja, [std::distance](<#/doc/iterator/distance>)(begin(), end()). 

### Parâmetros

(nenhum) 

### Valor de retorno

O número de elementos `CharT` na view. 

### Complexidade

Constante. 

### Exemplo

Execute este código
```
    #include <iostream>
    #include <string_view>
     
    // Print a string surrounded by single quotes, its
    // length and whether it is considered empty.
    void check_string(std::string_view ref)
    {
        std::cout << std::boolalpha
                  << "'" << ref << "' has " << ref.size()
                  << " character(s); emptiness: " << ref.empty() << '\n';
    }
     
    int main(int argc, char **argv)
    {
        // An empty string
        check_string("");
     
        // Almost always not empty: argv[0]
        if (argc > 0)
            check_string(argv[0]);
    }
```

Saída possível: 
```
    '' has 0 character(s); emptiness: true
    './a.out' has 7 character(s); emptiness: false
```

### Veja também

[ empty](<#/doc/string/basic_string_view/empty>) |  verifica se a view está vazia   
(função membro pública)  
[ max_size](<#/doc/string/basic_string_view/max_size>) |  retorna o número máximo de caracteres   
(função membro pública)  
[ sizelength](<#/doc/string/basic_string/size>) |  retorna o número de caracteres   
(função membro pública de `std::basic_string<CharT,Traits,Allocator>`)