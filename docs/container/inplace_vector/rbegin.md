# std::inplace_vector&lt;T,N&gt;::rbegin, std::inplace_vector&lt;T,N&gt;::crbegin

```cpp
constexpr reverse_iterator rbegin() noexcept;  // (1) (desde C++26)
constexpr const_reverse_iterator rbegin() const noexcept;  // (2) (desde C++26)
constexpr const_reverse_iterator crbegin() const noexcept;  // (3) (desde C++26)
```

  
Retorna um reverse iterator para o primeiro elemento do `inplace_vector` invertido. Ele corresponde ao último elemento do `inplace_vector` não invertido. Se o `inplace_vector` estiver vazio, o iterator retornado é igual a rend(). 

### Parâmetros

(nenhum) 

### Valor de retorno

Reverse iterator para o primeiro elemento. 

### Complexidade

Constante. 

### Notas

O [iterator subjacente](<#/doc/iterator/reverse_iterator/base>) do reverse iterator retornado é o [end iterator](<#/doc/container/inplace_vector/end>). Portanto, o iterator retornado é invalidado se e quando o end iterator for invalidado.

### Exemplo

Execute este código
```
    #include <algorithm>
    #include <inplace_vector>
    #include <iostream>
    #include <string>
    #include <string_view>
     
    void print(const std::string_view s) { std::cout << s << ' '; }
     
    int main()
    {
        const std::inplace_vector<std::string_view, 8> data
        {
            "▁", "▂", "▃", "▄", "▅", "▆", "▇", "█"
        };
        std::inplace_vector<std::string, 8> arr(8);
     
        std::copy(data.cbegin(), data.cend(), arr.begin());
     
        print("Print 'arr' in direct order using [cbegin, cend):\t");
        std::for_each(arr.cbegin(), arr.cend(), print);
     
        print("\n\nPrint 'arr' in reverse order using [crbegin, crend):\t");
        std::for_each(arr.crbegin(), arr.crend(), print);
    }
```

Saída: 
```
    Print 'arr' in direct order using [cbegin, cend):        ▁ ▂ ▃ ▄ ▅ ▆ ▇ █
     
    Print 'arr' in reverse order using [crbegin, crend):     █ ▇ ▆ ▅ ▄ ▃ ▂ ▁
```

### Veja também

[ rendcrend](<#/doc/container/inplace_vector/rend>) |  retorna um reverse iterator para o fim   
(função membro pública)  
[ rbegincrbegin](<#/doc/iterator/rbegin>)(C++14) |  retorna um reverse iterator para o início de um container ou array   
(modelo de função)