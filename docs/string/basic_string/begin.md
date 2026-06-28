# std::basic_string&lt;CharT,Traits,Allocator&gt;::begin, std::basic_string&lt;CharT,Traits,Allocator&gt;::cbegin

```cpp
iterator begin(); |  (1) | (noexcept desde C++11)
(constexpr desde C++20)
const_iterator begin() const; |  (2) | (noexcept desde C++11)
(constexpr desde C++20)
const_iterator cbegin() const noexcept;  // (3) (desde C++11)
(constexpr desde C++20)
```

  
Retorna um iterator para o primeiro caractere da string. 

`begin()` retorna um iterator [mutável](<#/doc/iterator>) ou [constante](<#/doc/iterator>), dependendo da constness de *this. 

`cbegin()` sempre retorna um iterator [constante](<#/doc/iterator>). É equivalente a const_cast&lt;const basic_string&&gt;(*this).begin(). 

### Parâmetros

(nenhum) 

### Valor de retorno

Iterator para o primeiro caractere. 

### Complexidade

Constante. 

### Notas

libc++ faz o backport de `cbegin()` para o modo C++98. 

### Exemplo

Execute este código
```
    #include <iostream>
    #include <string>
     
    int main()
    {
        std::string s("Exemplar");
        *s.begin() = 'e';
        std::cout << s << '\n';
     
        auto i = s.cbegin();
        std::cout << *i << '\n';
    //  *i = 'E'; // error: i is a constant iterator
    }
```

Saída: 
```
    exemplar
    e
```

### Veja também

[ endcend](<#/doc/string/basic_string/end>)(C++11) |  retorna um iterator para o fim   
(função membro pública)  
[ begincbegin](<#/doc/string/basic_string_view/begin>) |  retorna um iterator para o início   
(função membro pública de `std::basic_string_view<CharT,Traits>`)