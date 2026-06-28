# std::experimental::basic_string_view&lt;CharT,Traits&gt;::operator[]

constexpr const_reference operator[](size_type pos) const; |  |  (library fundamentals TS)  

  
Retorna uma referência const ao caractere na posição `pos` especificada.

Nenhuma verificação de limites é realizada: o comportamento é indefinido se pos >= size().

### Parâmetros

pos  |  \-  |  posição do caractere a ser retornado   
  
### Valor de retorno

Referência const ao caractere solicitado

### Exceções

Não lança exceções

### Complexidade

Constante.

### Observações

Ao contrário de [std::basic_string::operator[]](<#/doc/string/basic_string/operator_at>), `basic_string_view::operator[](size())` tem comportamento indefinido em vez de retornar `CharT()`.

### Exemplo

Execute este código
```
    #include <iostream>
    #include <experimental/string_view>
    int main()
    {
        std::string str = "Exemplar";
        std::experimental::string_view v = str;
        std::cout << v[2] << '\n';
    //  v[2] = 'y'; // Error: cannot modify through a string view
        str[2] = 'y';
        std::cout << v[2] << '\n';
    }
```

Saída: 
```
    e
    y
```

### Veja também

[ at](<#/doc/experimental/basic_string_view/at>) | acessa o caractere especificado com verificação de limites   
(função membro pública)  