# std::basic_string_view&lt;CharT,Traits&gt;::operator=

```cpp
constexpr basic_string_view& operator=( const basic_string_view& view ) noexcept = default;  // (desde C++17)
```

  
Substitui a view pela da view. 

### Parâmetros

view  |  \-  |  view a ser copiada   
  
### Valor de retorno

*this

### Complexidade

Constante. 

### Exemplo

Execute este código
```cpp 
    #include <iostream>
    #include <string_view>
    
    int main()
    {
        std::string_view v = "Hello, world";
        v = v.substr(7);
        std::cout << v << '\n';
    }
```

Saída: 
```
    world
```

### Veja também

[ (constructor)](<#/doc/string/basic_string_view/basic_string_view>) |  constrói uma `basic_string_view`   
(função membro pública)  
[ operator=](<#/>) |  atribui valores à string   
(função membro pública de `std::basic_string<CharT,Traits,Allocator>`)