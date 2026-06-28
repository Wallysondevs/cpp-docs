# std::list&lt;T,Allocator&gt;::splice

```cpp
void splice( const_iterator pos, list& other );  // (1)
void splice( const_iterator pos, list&& other );  // (2) (desde C++11)
void splice( const_iterator pos, list& other, const_iterator it );  // (3)
void splice( const_iterator pos, list&& other, const_iterator it );  // (4) (desde C++11)
void splice( const_iterator pos, list& other,
const_iterator first, const_iterator last);  // (5)
void splice( const_iterator pos, list&& other,
const_iterator first, const_iterator last );  // (6) (desde C++11)
```

Transfere elementos de uma lista para outra.

Nenhum elemento é copiado ou movido, apenas os ponteiros internos dos nós da lista são redirecionados. Nenhum iterator ou referência se torna invalidado; os iterators para elementos movidos permanecem válidos, mas agora se referem a *this, e não a other.

1,2) Transfere todos os elementos de other para *this. Os elementos são inseridos antes do elemento apontado por pos. O container other se torna vazio após a operação.

3,4) Transfere o elemento apontado por it de other para *this. O elemento é inserido antes do elemento apontado por pos.

5,6) Transfere os elementos no range `[`first`, `last`)` de other para *this. Os elementos são inseridos antes do elemento apontado por pos.

O comportamento é indefinido se

*   get_allocator() != other.get_allocator(),
*   para as sobrecargas (1,2), *this e other se referem ao mesmo objeto,
*   para as sobrecargas (3,4), it não é um [iterator dereferenciável](<#/doc/iterator>) em other, ou
*   para as sobrecargas (5,6),

    *   `[`first`, `last`)` não é um [range válido](<#/doc/iterator>) em other, ou`
    *   `pos está em `[`first`, `last`)`.`

### Parâmetros

- **pos** — elemento antes do qual o conteúdo será inserido
- **other** — outro container do qual o conteúdo será transferido
- **it** — o elemento a ser transferido de other para *this
- **first, last** — o range de elementos a ser transferido de other para *this

### Valor de retorno

(nenhum)

### Exceções

Não lança exceções.

### Complexidade

1-4) Constante.

5,6) Constante se other se refere ao mesmo objeto que *this, caso contrário, linear em [std::distance](<#/doc/iterator/distance>)(first, last).

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <list>
    
    std::ostream& operator<<(std::ostream& ostr, const std::list<int>& list)
    {
        for (auto& i : list)
            ostr << ' ' << i;
    
        return ostr;
    }
    
    int main ()
    {
        std::list<int> list1{1, 2, 3, 4, 5};
        std::list<int> list2{10, 20, 30, 40, 50};
    
        auto it = list1.begin();
        std::advance(it, 2);
    
        list1.splice(it, list2);
    
        std::cout << "list1:" << list1 << '\n';
        std::cout << "list2:" << list2 << '\n';
    
        list2.splice(list2.begin(), list1, it, list1.end());
    
        std::cout << "list1:" << list1 << '\n';
        std::cout << "list2:" << list2 << '\n';
    }
```

Saída:
```
    list1: 1 2 10 20 30 40 50 3 4 5
    list2:
    list1: 1 2 10 20 30 40 50
    list2: 3 4 5
```

### Relatórios de Defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 250](<https://cplusplus.github.io/LWG/issue250>) | C++98 | referências e iterators para o(s) elemento(s) movido(s) eram todos invalidados | eles se referem ou apontam para o(s) mesmo(s) elemento(s) em *this
[N2525](<https://wg21.link/N2525>) | C++98 | splicing O(1) não podia ser garantido se get_allocator() != other.get_allocator() | o comportamento é indefinido neste caso

### Veja também

[ merge](<#/doc/container/list/merge>) | mescla duas listas ordenadas
(função membro pública)
[ removeremove_if](<#/doc/container/list/remove>) | remove elementos que satisfazem critérios específicos
(função membro pública)