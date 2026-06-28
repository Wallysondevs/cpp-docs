# std::basic_string_view&lt;CharT,Traits&gt;::operator[]

```cpp
constexpr const_reference operator const;  // (desde C++17)
```

  
Retorna uma referência const ao caractere na posição `pos` especificada.

Nenhuma verificação de limites é realizada: o comportamento é indefinido se `pos >= size()`.

### Parâmetros

pos  |  \-  |  posição do caractere a ser retornado   
  
### Valor de retorno

Referência const ao caractere solicitado.

### Exceções

Não lança exceções.

### Complexidade

Constante.

### Observações

Ao contrário de [std::basic_string::operator[]](<#/doc/string/basic_string/operator_at>), std::basic_string_view::operator[](size()) tem comportamento indefinido em vez de retornar `CharT()`.

### Exemplo

Execute este código
```
    #include <iostream>
    #include <string_view>
     
    int main()
    {
        std::string str = "Exemplar";
        std::string_view v = str;
        std::cout << v[2] << '\n';
    //  v[2] = 'y'; // Error: cannot modify through a string view
        str[2] = 'y';
        std::cout << v[2] << '\n';
    }
```

Output: 
```
    e
    y
```

### Veja também

[ at](<#/doc/string/basic_string_view/at>) | acessa o caractere especificado com verificação de limites   
(função membro pública)  
[ operator[]](<#/doc/string/basic_string/operator_at>) | acessa o caractere especificado   
(função membro pública de `std::basic_string<CharT,Traits,Allocator>`)