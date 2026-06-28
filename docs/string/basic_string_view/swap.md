# std::basic_string_view&lt;CharT,Traits&gt;::swap

```cpp
constexpr void swap( basic_string_view& v ) noexcept;  // (desde C++17)
```

  
Troca a view com a de v. 

### Parâmetros

v  |  \-  |  view para trocar   
  
### Valor de retorno

(nenhum) 

### Complexidade

Constante. 

### Exemplo

Execute este código
```
    #include <iostream>
    #include <string_view>
     
    int main() 
    {
        std::string_view a = "AAA";
        std::string_view b = "BBBB";
     
        std::cout << "Before swap:\n"
                     "a = " << a << "\n"
                     "b = " << b << "\n\n";
     
        a.swap(b);
     
        std::cout << "After swap:\n"
                     "a = " << a << "\n"
                     "b = " << b << '\n';
    }
```

Saída: 
```
    Before swap:
    a = AAA
    b = BBBB
     
    After swap:
    a = BBBB
    b = AAA
```

### Veja também

[ swap](<#/doc/utility/swap>) |  troca os valores de dois objetos   
(modelo de função)  
[ swap_ranges](<#/doc/algorithm/swap_ranges>) |  troca dois ranges de elementos   
(modelo de função)  
[ swap](<#/doc/string/basic_string/swap>) |  troca o conteúdo   
(função membro pública de `std::basic_string<CharT,Traits,Allocator>`)