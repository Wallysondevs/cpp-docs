# std::basic_string_view&lt;CharT,Traits&gt;::at

```cpp
constexpr const_reference at( size_type pos ) const;  // (desde C++17)
```

  
Retorna uma referência `const` para o caractere na posição `pos` especificada. A verificação de limites é realizada, uma exceção do tipo [std::out_of_range](<#/doc/error/out_of_range>) será lançada em caso de acesso inválido. 

### Parâmetros

pos  |  \-  |  posição do caractere a ser retornado   
  
### Valor de retorno

Referência `const` para o caractere solicitado. 

### Exceções

Lança [std::out_of_range](<#/doc/error/out_of_range>) se pos >= size(). 

### Complexidade

Constante. 

### Exemplo

Execute este código
```
    #include <iostream>
    #include <stdexcept>
    #include <string_view>
     
    int main()
    {
        std::string_view str_view("abcdef");
     
        try
        {
            for (std::size_t i = 0; true; ++i)
                std::cout << i << ": " << str_view.at(i) << '\n';
        }
        catch (const std::out_of_range& e)
        {
            std::cout << "Whooops. Index is out of range.\n";
            std::cout << e.what() << '\n';
        }
    }
```

Saída possível: 
```
    0: a
    1: b
    2: c
    3: d
    4: e
    5: f
    6: Whooops. Index is out of range.
    basic_string_view::at: __pos (which is 6) >= this->size() (which is 6)
```

### Veja também

[ operator[]](<#/doc/string/basic_string_view/operator_at>) |  acessa o caractere especificado   
(função membro pública)  
[ at](<#/doc/string/basic_string/at>) |  acessa o caractere especificado com verificação de limites   
(função membro pública de `std::basic_string<CharT,Traits,Allocator>`)