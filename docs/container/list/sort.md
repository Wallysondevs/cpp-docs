# std::list&lt;T,Allocator&gt;::sort

```cpp
void sort();  // (1)
template< class Compare >
void sort( Compare comp );  // (2)
```

Ordena os elementos e preserva a ordem dos elementos equivalentes. Nenhuma referência ou *iterator* é invalidado.

1) Os elementos são comparados usando o `operator<`.

2) Os elementos são comparados usando `comp`.

Se uma exceção for lançada, a ordem dos elementos em `*this` é não especificada.

### Parameters

- **comp** — objeto de função de comparação (ou seja, um objeto que satisfaz os requisitos de [Compare](<#/doc/named_req/Compare>)) que retorna `true` se o primeiro argumento for _menor_ que (ou seja, é ordenado _antes_) o segundo.
A assinatura da função de comparação deve ser equivalente à seguinte: `bool cmp(const Type1& a, const Type2& b);` Embora a assinatura não precise ter `const&`, a função não deve modificar os objetos passados a ela e deve ser capaz de aceitar todos os valores do tipo (possivelmente `const`) `Type1` e `Type2` independentemente da [categoria de valor](<#/doc/language/value_category>) (assim, `Type1&` não é permitido, nem `Type1` a menos que para `Type1` uma *move* seja equivalente a uma cópia (desde C++11)).
Os tipos `Type1` e `Type2` devem ser tais que um objeto do tipo `list<T,Allocator>::const_iterator` possa ser desreferenciado e então implicitamente convertido para ambos. ​
Requisitos de tipo
- `Compare` deve atender aos requisitos de [Compare](<#/doc/named_req/Compare>).

### Return value

(nenhum)

### Complexity

Dado \\(\scriptsize N\\)N como [size()](<#/doc/container/list/size>):

1) Aproximadamente \\(\scriptsize N \cdot log(N)\\)N·log(N) comparações usando o `operator<`.

2) Aproximadamente \\(\scriptsize N \cdot log(N)\\)N·log(N) aplicações da função de comparação `comp`.

### Notes

[std::sort](<#/doc/algorithm/sort>) requer *iterators* de acesso aleatório e, portanto, não pode ser usado com `list`. Esta função também difere de [std::sort](<#/doc/algorithm/sort>) porque não exige que o tipo de elemento da `list` seja *swappable*, preserva os valores de todos os *iterators* e realiza uma ordenação estável.

### Example

Execute este código
```cpp
    #include <functional>
    #include <iostream>
    #include <list>
    
    std::ostream& operator<<(std::ostream& ostr, const std::list<int>& list)
    {
        for (const int i : list)
            ostr << ' ' << i;
        return ostr;
    }
    
    int main()
    {
        std::list<int> list{8, 7, 5, 9, 0, 1, 3, 2, 6, 4};
        std::cout << "initially: " << list << '\n';
    
        list.sort();
        std::cout << "ascending: " << list << '\n';
    
        list.sort(std::greater<int>());
        std::cout << "descending:" << list << '\n';
    }
```

Output:
```
    initially:  8 7 5 9 0 1 3 2 6 4
    ascending:  0 1 2 3 4 5 6 7 8 9
    descending: 9 8 7 6 5 4 3 2 1 0
```

### Defect reports

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 1207](<https://cplusplus.github.io/LWG/issue1207>) | C++98 | não estava claro se *iterators* e/ou referências seriam invalidados | manter válidos

### See also

[ reverse](<#/doc/container/list/reverse>) | inverte a ordem dos elementos
(função membro pública)