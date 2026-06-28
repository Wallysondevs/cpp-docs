# Requisitos nomeados C++: ValueSwappable (desde C++11)

Dois objetos deste tipo podem ser desreferenciados e os valores resultantes podem ser trocados usando uma chamada de função não qualificada `swap()` no contexto onde tanto [std::swap](<#/doc/utility/swap>) quanto os `swap()` definidos pelo usuário são visíveis.

### Requisitos

Um tipo T é ValueSwappable se

1. `T` satisfaz os requisitos de [LegacyIterator](<#/doc/named_req/Iterator>).
2. Para qualquer objeto desreferenciável `x` do tipo `T` (isto é, qualquer valor diferente do iterador de fim), `*x` satisfaz os requisitos de [Swappable](<#/doc/named_req/Swappable>).

Muitas funções da standard library esperam que seus argumentos satisfaçam ValueSwappable, o que significa que sempre que a standard library realiza uma troca (swap), ela usa o equivalente a `using [std::swap](<#/doc/algorithm/swap>); swap(*iter1, *iter2);`.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <vector>
     
    class IntVector
    {
        std::vector<int> v;
    //  IntVector& operator=(IntVector); // not assignable (C++98 way)
    public:
        IntVector& operator=(IntVector) = delete; // not assignable
        void swap(IntVector& other)
        {
            v.swap(other.v);
        }
    };
     
    void swap(IntVector& v1, IntVector& v2)
    {
        v1.swap(v2);
    }
     
    int main()
    {
        IntVector v1, v2;    // IntVector is Swappable, but not MoveAssignable
        IntVector* p1 = &v1;
        IntVector* p2 = &v2; // IntVector* is ValueSwappable
        std::iter_swap(p1, p2); // OK: iter_swap requires ValueSwappable
    //  std::swap(v1, v2); // compiler error! std::swap requires MoveAssignable
    }
```

### Veja também

[ indirectly_swappable](<#/doc/iterator/indirectly_swappable>)(C++20) | especifica que os valores referenciados por dois tipos [`indirectly_readable`](<#/doc/iterator/indirectly_readable>) podem ser trocados
(concept)
*[_(as is)_]: A::pointer