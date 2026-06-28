# std::unordered_multiset&lt;Key,Hash,KeyEqual,Allocator&gt;::merge

```cpp
template< class H2, class P2 >
void merge( std::unordered_set<Key, H2, P2, Allocator>& source );  // (1) (desde C++17)
template< class H2, class P2 >
void merge( std::unordered_set<Key, H2, P2, Allocator>&& source );  // (2) (desde C++17)
template< class H2, class P2 >
void merge( std::unordered_multiset<Key, H2, P2, Allocator>& source );  // (3) (desde C++17)
template< class H2, class P2 >
void merge( std::unordered_multiset<Key, H2, P2, Allocator>&& source );  // (4) (desde C++17)
```

  
Tenta extrair ("emendar") cada elemento em `source` e inseri-lo em `*this` usando a função hash e o predicado de igualdade de chave de `*this`.

Nenhum elemento é copiado ou movido, apenas os ponteiros internos dos nós do container são redirecionados. Todos os ponteiros e referências para os elementos transferidos permanecem válidos, mas agora referem-se a `*this`, não a `source`. Iterators que se referem aos elementos transferidos e todos os iterators que se referem a `*this` são invalidados.

O comportamento é indefinido se `get_allocator() != source.get_allocator()`.

### Parâmetros

source  |  \-  |  container compatível para transferir os nós de   
  
### Valor de retorno

(nenhum) 

  

### Complexidade

Caso médio O(N), pior caso O(N * size() + N), onde N é `source.size()`.

### Exemplo

Execute este código
```
    #include <iostream>
    #include <unordered_set>
     
    // print out a container
    template<class Os, class K>
    Os& operator<<(Os& os, const std::unordered_multiset<K>& v)
    {
        os << '[' << v.size() << "] {";
        bool o{};
        for (const auto& e : v)
            os << (o ? ", " : (o = 1, " ")) << e;
        return os << " }\n";
    }
     
    int main()
    {
        std::unordered_multiset<char>
            p{'C', 'B', 'B', 'A'}, 
            q{'E', 'D', 'E', 'C'};
     
        std::cout << "p: " << p << "q: " << q;
     
        p.merge(q);
     
        std::cout << "p.merge(q);\n" << "p: " << p << "q: " << q;
    }
```

Saída possível: 
```
    p: [4] { A, B, B, C }
    q: [4] { C, D, E, E }
    p.merge(q);
    p: [8] { E, E, D, A, B, B, C, C }
    q: [0] { }
```

### Veja também

[ extract](<#/doc/container/unordered_multiset/extract>)(C++17) |  extrai nós do container   
(função membro pública)  
[ insert](<#/doc/container/unordered_multiset/insert>) |  insere elementos ou nós(desde C++17)   
(função membro pública)