# std::experimental::basic_string_view&lt;CharT,Traits&gt;::remove_suffix

constexpr void remove_suffix( size_type n ); |  |  (library fundamentals TS)  

  
Move o final da view para trás em n caracteres.

O comportamento é indefinido se n > size().

### Parâmetros

n  |  \-  |  número de caracteres a remover do final da view   
  
### Valor de retorno

(nenhum) 

### Complexidade

Constante. 

### Exemplo

Execute este código
```cpp
    #include <experimental/string_view>
    #include <iostream>
     
    int main()
    {
        char arr[] = {'a', 'b', 'c', 'd', '\0', '\0', '\0'};
        std::experimental::string_view v(arr, sizeof arr);
        auto trim_pos = v.find('\0');
        if (trim_pos != v.npos)
            v.remove_suffix(v.size() - trim_pos);
        std::cout << "Array: '" << arr << "', size=" << sizeof arr << '\n'
                  << "View : '" << v << "', size=" << v.size() << '\n';
    }
```

Saída: 
```
    Array: 'abcd', size=7
    View : 'abcd', size=4
```

### Ver também

[ remove_prefix](<#/doc/experimental/basic_string_view/remove_prefix>) |  encolhe a view movendo seu início para frente   
(função membro pública)  