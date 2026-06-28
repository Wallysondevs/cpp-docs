# std::forward_list&lt;T,Allocator&gt;::sort

```cpp
void sort();  // (1) (desde C++11)
template< class Compare >
void sort( Compare comp );  // (2) (desde C++11)
```

  
Ordena os elementos e preserva a ordem dos elementos equivalentes. Nenhuma referência ou iterator é invalidado.

1) Os elementos são comparados usando operator<.

2) Os elementos são comparados usando comp.

Se uma exceção for lançada, a ordem dos elementos em *this é não especificada.

### Parâmetros

- **comp** — objeto de função de comparação (ou seja, um objeto que satisfaz os requisitos de [Compare](<#/doc/named_req/Compare>)) que retorna ​true se o primeiro argumento é _menor_ que (ou seja, é ordenado _antes_) o segundo.
A assinatura da função de comparação deve ser equivalente à seguinte: bool cmp(const Type1& a, const Type2& b); Embora a assinatura não precise ter const&, a função não deve modificar os objetos passados a ela e deve ser capaz de aceitar todos os valores do tipo (possivelmente const) `Type1` e `Type2` independentemente da [categoria de valor](<#/doc/language/value_category>) (assim, `Type1&` não é permitido, nem `Type1` a menos que para `Type1` um move seja equivalente a uma cópia (desde C++11)).
Os tipos Type1 e Type2 devem ser tais que um objeto do tipo forward_list<T,Allocator>::const_iterator possa ser desreferenciado e então implicitamente convertido para ambos. ​
Requisitos de tipo
-`Compare` deve atender aos requisitos de [Compare](<#/doc/named_req/Compare>).
  
### Valor de retorno

(nenhum)

### Complexidade

Dado \\(\scriptsize N\\)N como [std::distance](<#/doc/iterator/distance>)(begin(), end()):

1) Aproximadamente \\(\scriptsize N \cdot log(N)\\)N·log(N) comparações usando operator<.

2) Aproximadamente \\(\scriptsize N \cdot log(N)\\)N·log(N) aplicações da função de comparação comp.

### Observações

[std::sort](<#/doc/algorithm/sort>) requer iterators de acesso aleatório e, portanto, não pode ser usado com `forward_list`. Esta função também difere de [std::sort](<#/doc/algorithm/sort>) porque não exige que o tipo de elemento da `forward_list` seja trocável (swappable), preserva os valores de todos os iterators e realiza uma ordenação estável.

### Exemplo

Execute este código
```cpp
    #include <functional>
    #include <iostream>
    #include <forward_list>
    
    std::ostream& operator<<(std::ostream& ostr, const std::forward_list<int>& list)
    {
        for (const int i : list)
            ostr << ' ' << i;
        return ostr;
    }
    
    int main()
    {
        std::forward_list<int> list{8, 7, 5, 9, 0, 1, 3, 2, 6, 4};
        std::cout << "initially: " << list << '\n';
    
        list.sort();
        std::cout << "ascending: " << list << '\n';
    
        list.sort(std::greater<int>());
        std::cout << "descending:" << list << '\n';
    }
```

Saída:
```
    initially:  8 7 5 9 0 1 3 2 6 4
    ascending:  0 1 2 3 4 5 6 7 8 9
    descending: 9 8 7 6 5 4 3 2 1 0
```

### Ver também

[ reverse](<#/doc/container/forward_list/reverse>) | inverte a ordem dos elementos
(função membro pública)