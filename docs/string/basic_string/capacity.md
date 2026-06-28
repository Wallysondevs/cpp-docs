# std::basic_string&lt;CharT,Traits,Allocator&gt;::capacity

`size_type capacity() const;` | | `(noexcept desde C++11)`
` (constexpr desde C++20)`

Retorna o número de caracteres para os quais a string alocou espaço atualmente.

### Parameters

(nenhum)

### Return value

Capacidade do armazenamento atualmente alocado, ou seja, o armazenamento disponível para guardar elementos.

### Complexity

Constante.

### Notes

Locais de memória obtidos do allocator, mas não disponíveis para armazenar nenhum elemento, não são contados no armazenamento alocado. Note que o terminador nulo não é um elemento de [std::basic_string](<#/doc/string/basic_string>).

### Example

Execute este código
```cpp
    #include <iomanip>
    #include <iostream>
    #include <string>
    
    void show_capacity(std::string const& s)
    {
        std::cout << std::quoted(s) << " has capacity " << s.capacity() << ".\n";
    }
    
    int main()
    {
        std::string s{"Exemplar"};
        show_capacity(s);
    
        s += " is an example string.";
        show_capacity(s);
    
        s.clear();
        show_capacity(s);
    
        std::cout << "\nDemonstrate the capacity's growth policy."
                     "\nSize:  Capacity:  Ratio:\n" << std::left;
    
        std::string g;
        auto old_cap{g.capacity()};
    
        for (int mark{}; mark != 5; ++mark)
        {
            while (old_cap == g.capacity())
                g.push_back('.');
    
            std::cout << std::setw( 7) << g.size()
                      << std::setw(11) << g.capacity()
                      << std::setw(10) << g.capacity() / static_cast<float>(old_cap) << '\n';
    
            old_cap = g.capacity();
        }
    }
```

Saída possível:
```
    "Exemplar" has capacity 15.
    "Exemplar is an example string." has capacity 30.
    "" has capacity 30.
    
    Demonstrate the capacity's growth policy.
    Size:  Capacity:  Ratio:
    16     30         2
    31     60         2
    61     120        2
    121    240        2
    241    480        2
```

### See also

[ sizelength](<#/doc/string/basic_string/size>) | retorna o número de caracteres
(função membro pública)
[ reserve](<#/doc/string/basic_string/reserve>) | reserva armazenamento
(função membro pública)