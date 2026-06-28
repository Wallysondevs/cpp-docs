# std::pair&lt;T1,T2&gt;::swap

```cpp
  // (1)
void swap( pair& other ) noexcept(/* see below */);  // (desde C++11)
(até C++20)
constexpr void swap( pair& other ) noexcept(/* see below */);  // (desde C++20)
constexpr void swap( const pair& other ) const noexcept(/* see below */);  // (2) (desde C++23)
```

  
Troca `first` com `other.first` e `second` com `other.second`, como se usando [std::swap](<#/doc/algorithm/swap>); swap(first, other.first); swap(second, other.second);. 

Se qualquer chamada de função `swap` selecionada for malformada (`ill-formed`) ou não trocar o valor do membro, o comportamento é indefinido.  | (até C++23)  
---|---
1) O programa é malformado (`ill-formed`) se [std::is_swappable_v](<#/doc/types/is_swappable>)&lt;T1&gt; ou [std::is_swappable_v](<#/doc/types/is_swappable>)&lt;T2&gt; não for verdadeiro. 2) O programa é malformado (`ill-formed`) se [std::is_swappable_v](<#/doc/types/is_swappable>)&lt;const T1&gt; ou [std::is_swappable_v](<#/doc/types/is_swappable>)&lt;const T2&gt; não for verdadeiro. Se qualquer chamada de função `swap` selecionada não trocar o valor do membro, o comportamento é indefinido.  | (desde C++23)  
  
### Parâmetros

other  |  \-  |  par de valores a serem trocados   
  
### Valor de retorno

(nenhum) 

### Exceções

```cpp
Especificação `noexcept`: noexcept(
noexcept(swap(first, other.first)) &&
noexcept(swap(second, other.second))
) Na expressão acima, o identificador `swap` é procurado da mesma maneira que a usada pelo trait C++17 std::is_nothrow_swappable.  // (até C++17)
```
1) Especificação [`noexcept`](<#/doc/language/noexcept_spec>): noexcept(  
```cpp
std::is_nothrow_swappable_v<first_type> &&
std::is_nothrow_swappable_v<second_type>
) 2) Especificação `noexcept`: noexcept(
std::is_nothrow_swappable_v<const first_type> &&
std::is_nothrow_swappable_v<const second_type>
)  // (desde C++17)
```
  
### Exemplo

Execute este código
```cpp 
    #include <iostream>
    #include <utility>
    #include <string>
    int main()
    {
        std::pair<int, std::string> p1(10, "test"), p2;
        p2.swap(p1);
        std::cout << "(" << p2.first << ", " << p2.second << ")\n";
    
    #if __cpp_lib_ranges_zip >= 202110L
        // Using the C++23 const qualified swap overload
        // (swap is no longer propagating pair constness)
        int i1 = 10, i2{};
        std::string s1("test"), s2;
        const std::pair<int&, std::string&> r1(i1, s1), r2(i2, s2);
        r2.swap(r1);
        std::cout << "(" << i2 << ", " << s2 << ")\n";
    #endif
    }
```

Saída possível: 
``` 
    (10, test)
    (10, test)
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 2456](<https://cplusplus.github.io/LWG/issue2456>) | C++11  | a especificação `noexcept` é malformada (`ill-formed`)  | feita para funcionar   
  
### Veja também

[ swap](<#/doc/utility/swap>) |  troca os valores de dois objetos   
(modelo de função)  
[ swap](<#/doc/utility/tuple/swap>) |  troca o conteúdo de duas `tuple`s   
(função membro pública de `std::tuple<Types...>`)