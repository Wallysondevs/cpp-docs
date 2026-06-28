# std::list&lt;T,Allocator&gt;::merge

```cpp
void merge( list& other );  // (1)
void merge( list&& other );  // (2) (desde C++11)
template< class Compare >
void merge( list& other, Compare comp );  // (3)
template< class Compare >
void merge( list&& other, Compare comp );  // (4) (desde C++11)
```

  
A função não faz nada se `other` se refere ao mesmo objeto que `*this`.

Caso contrário, mescla `other` em `*this`. Ambas as listas devem estar ordenadas. Nenhum elemento é copiado, e o container `other` se torna vazio após a mesclagem. Esta operação é estável: para elementos equivalentes nas duas listas, os elementos de `*this` sempre precedem os elementos de `other`, e a ordem dos elementos equivalentes de `*this` e `other` não muda.

Nenhum iterator ou referência é invalidado. Os ponteiros e referências para os elementos movidos de `*this`, assim como os iterators que se referem a esses elementos, irão se referir aos mesmos elementos de `*this`, em vez de `other`.

1,2) Elementos são comparados usando [std::less](<#/doc/utility/functional/less>)&lt;T&gt;()(até C++14)[std::less](<#/doc/utility/functional/less>)<>()(desde C++14).

3,4) Elementos são comparados usando `comp`.

Se `*this` ou `other` não estiverem ordenados em relação ao comparador correspondente, ou se `get_allocator() != other.get_allocator()`, o comportamento é indefinido.

### Parâmetros

- `other` — outro container para mesclar
`comp`  |  \-  |  objeto de função de comparação (isto é, um objeto que satisfaz os requisitos de [Compare](<#/doc/named_req/Compare>)) que retorna `true` se o primeiro argumento é _menor_ que (isto é, é ordenado _antes_ de) o segundo.   
A assinatura da função de comparação deve ser equivalente à seguinte: `bool cmp(const Type1& a, const Type2& b);` Embora a assinatura não precise ter `const&`, a função não deve modificar os objetos passados a ela e deve ser capaz de aceitar todos os valores do tipo (possivelmente `const`) `Type1` e `Type2` independentemente da [categoria de valor](<#/doc/language/value_category>) (assim, `Type1&` não é permitido, nem `Type1` a menos que para `Type1` uma movimentação seja equivalente a uma cópia (desde C++11)).  
Os tipos `Type1` e `Type2` devem ser tais que um objeto do tipo `list<T, Allocator>::const_iterator` possa ser desreferenciado e então implicitamente convertido para ambos. ​   
Requisitos de tipo   
-`Compare` deve atender aos requisitos de [Compare](<#/doc/named_req/Compare>).   
  
### Valor de retorno

(nenhum) 

### Exceções

Se uma exceção for lançada por qualquer motivo, estas funções não têm efeito ([garantia de segurança de exceção forte](<#/doc/language/exceptions>)). Exceto se a exceção vier de uma comparação. 

### Complexidade

Se `other` se refere ao mesmo objeto que `*this`, nenhuma comparação é realizada. 

Caso contrário, dado \\(\scriptsize N\\)N como [std::distance](<#/doc/iterator/distance>)(begin(), end()) e \\(\scriptsize R\\)R como [std::distance](<#/doc/iterator/distance>)(other.begin(), other.end()): 

1,2) No máximo \\(\scriptsize N+R-1\\)N+R-1 comparações usando `operator<`.

3,4) No máximo \\(\scriptsize N+R-1\\)N+R-1 aplicações da função de comparação `comp`.

### Exemplo

Execute este código
```cpp
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
        std::list<int> list1 = {5, 9, 1, 3, 3};
        std::list<int> list2 = {8, 7, 2, 3, 4, 4};
     
        list1.sort();
        list2.sort();
        std::cout << "list1: " << list1 << '\n';
        std::cout << "list2: " << list2 << '\n';
     
        list1.merge(list2);
        std::cout << "merged:" << list1 << '\n';
    }
```

Saída: 
```
    list1:  1 3 3 5 9
    list2:  2 3 4 4 7 8
    merged: 1 2 3 3 3 4 4 5 7 8 9
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 300](<https://cplusplus.github.io/LWG/issue300>) | C++98  | o efeito quando `*this` e `other` se referem ao mesmo objeto não foi especificado  | especificado como no-op   
[LWG 1207](<https://cplusplus.github.io/LWG/issue1207>) | C++98  | não estava claro se iterators e/ou referências seriam invalidados  | mantêm-se válidos   
[LWG 1215](<https://cplusplus.github.io/LWG/issue1215>) | C++98  | A movimentação de nó O(1) não podia ser garantida se `get_allocator() != other.get_allocator()` | o comportamento é indefinido neste caso   
[LWG 3088](<https://cplusplus.github.io/LWG/issue3088>) | C++98  | `operator<` poderia se comportar mal para elementos ponteiro  | ordem total estrita definida pela implementação usada   
  
### Ver também

[ splice](<#/doc/container/list/splice>) | move elementos de outra `list`   
(função membro pública)  
[ merge](<#/doc/algorithm/merge>) | mescla dois ranges ordenados   
(modelo de função)  
[ inplace_merge](<#/doc/algorithm/inplace_merge>) | mescla dois ranges ordenados no local   
(modelo de função)  
[ ranges::merge](<#/doc/algorithm/ranges/merge>)(C++20) | mescla dois ranges ordenados  
(objeto de função de algoritmo)  
[ ranges::inplace_merge](<#/doc/algorithm/ranges/inplace_merge>)(C++20) | mescla dois ranges ordenados no local  
(objeto de função de algoritmo)