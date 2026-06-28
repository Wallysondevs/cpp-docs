# std::forward_list&lt;T,Allocator&gt;::splice_after

```cpp
void splice_after( const_iterator pos, forward_list& other );  // (1) (desde C++11)
void splice_after( const_iterator pos, forward_list&& other );  // (2) (desde C++11)
void splice_after( const_iterator pos, forward_list& other,
const_iterator it );  // (3) (desde C++11)
void splice_after( const_iterator pos, forward_list&& other,
const_iterator it );  // (4) (desde C++11)
void splice_after( const_iterator pos, forward_list& other,
const_iterator first, const_iterator last );  // (5) (desde C++11)
void splice_after( const_iterator pos, forward_list&& other,
const_iterator first, const_iterator last );  // (6) (desde C++11)
```

  
Move elementos de outra `forward_list` para *this. Os elementos são inseridos após o elemento apontado por pos.

Nenhum elemento é copiado. Nenhum iterator ou referência se torna invalidado. Os iterators para os elementos movidos agora se referem a *this, não a other.

1,2) Move todos os elementos de other para *this. O container other se torna vazio após a operação.

3,4) Move o elemento apontado pelo iterator que segue `it` de other para *this. Não tem efeito se pos == it ou se pos == ++it.

5,6) Move os elementos no range `(`first`, `last`)` de other para *this. O elemento apontado por first não é movido.

O comportamento é indefinido se

  * get_allocator() != other.get_allocator(),
  * pos não é nem before_begin() nem um [iterator dereferenciável](<#/doc/iterator>) em `[`begin()`, `end()`)`,
  * para as sobrecargas (1,2), *this e other se referem ao mesmo objeto,
  * para as sobrecargas (3,4), o iterator que segue `it` não é um [iterator dereferenciável](<#/doc/iterator>) em other, ou
  * para as sobrecargas (5,6),

    

  * `(`first`, `last`)` não é um [range válido](<#/doc/iterator>) em other,
  * alguns iterators em `(`first`, `last`)` não são [dereferenciáveis](<#/doc/iterator>), ou
  * pos está em `(`first`, `last`)`.

### Parâmetros

pos  |  \-  |  elemento após o qual o conteúdo será inserido   
---|---|---
other  |  \-  |  outro container de onde o conteúdo será movido   
it  |  \-  |  iterator que precede o iterator para o elemento a ser movido de other para *this  
first, last  |  \-  |  o range de elementos a serem movidos de other para *this  
  
### Exceções

Não lança exceções.

### Complexidade

1,2) Linear no tamanho de other.

3,4) Constante.

5,6) Linear em [std::distance](<#/doc/iterator/distance>)(first, last).

### Exemplo

Execute este código
```cpp
    #include <cassert>
    #include <forward_list>
    
    int main()
    {
        using F = std::forward_list<int>;
    
        // Demonstrate the meaning of open range (first, last)
        // in overload (5): the first element of l1 is not moved.
        F l1 = {1, 2, 3, 4, 5};
        F l2 = {10, 11, 12};
    
        l2.splice_after(l2.cbegin(), l1, l1.cbegin(), l1.cend());
        // Not equivalent to l2.splice_after(l2.cbegin(), l1);
        // which is equivalent to
        // l2.splice_after(l2.cbegin(), l1, l1.cbefore_begin(), l1.end());
    
        assert((l1 == F{1}));
        assert((l2 == F{10, 2, 3, 4, 5, 11, 12}));
    
        // Overload (1)
        F x = {1, 2, 3, 4, 5};
        F y = {10, 11, 12};
        x.splice_after(x.cbegin(), y);
        assert((x == F{1, 10, 11, 12, 2, 3, 4, 5}));
        assert((y == F{}));
    
        // Overload (3)
        x = {1, 2, 3, 4, 5};
        y = {10, 11, 12};
        x.splice_after(x.cbegin(), y, y.cbegin());
        assert((x == F{1, 11, 2, 3, 4, 5}));
        assert((y == F{10, 12}));
    
        // Overload (5)
        x = {1, 2, 3, 4, 5};
        y = {10, 11, 12};
        x.splice_after(x.cbegin(), y, y.cbegin(), y.cend());
        assert((x == F{1, 11, 12, 2, 3, 4, 5}));
        assert((y == F{10}));
    }
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR  | Aplicado a  | Comportamento como publicado  | Comportamento correto   
[LWG 2045](<https://cplusplus.github.io/LWG/issue2045>) | C++11  | O splicing O(1) não podia ser garantido se  
get_allocator() != other.get_allocator() | o comportamento é  
indefinido neste caso   
[LWG 2222](<https://cplusplus.github.io/LWG/issue2222>) | C++11  | o elemento apontado por it não é movido, mas ponteiros, referências e  
iterators que se referem a ele se refeririam a um elemento em *this após o splicing  | ainda se referem ao  
elemento em other  
  
### Veja também

[ merge](<#/doc/container/forward_list/merge>) |  mescla duas listas ordenadas   
(função membro pública)  
[ removeremove_if](<#/doc/container/forward_list/remove>) |  remove elementos que satisfazem critérios específicos   
(função membro pública)  
[ before_begincbefore_begin](<#/doc/container/forward_list/before_begin>) |  retorna um iterator para o elemento antes do início   
(função membro pública)