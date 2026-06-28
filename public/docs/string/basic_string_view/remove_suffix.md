# std::basic_string_view&lt;CharT,Traits&gt;::remove_suffix

```cpp
constexpr void remove_suffix( size_type n );  // (desde C++17)
```

  
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
    #include <iostream>
    #include <string_view>
     
    int main()
    {
        char arr[] = {'a', 'b', 'c', 'd', '\0', '\0', '\0'};
        std::string_view v(arr, sizeof arr);
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

### Veja também

[ remove_prefix](<#/doc/string/basic_string_view/remove_prefix>) |  encolhe a view movendo seu início para frente   
(função membro pública)  