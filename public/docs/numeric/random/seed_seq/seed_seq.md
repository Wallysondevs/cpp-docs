# std::seed_seq::seed_seq

```cpp
seed_seq() noexcept;  // (1) (desde C++11)
seed_seq( const seed_seq& ) = delete;  // (2) (desde C++11)
template< class InputIt >
seed_seq( InputIt begin, InputIt end );  // (3) (desde C++11)
template< class T >
seed_seq( std::initializer_list<T> il );  // (4) (desde C++11)
```

1) O construtor padrão. Após a construção, `_[v](<#/doc/numeric/random/seed_seq>)_` está vazio.

2) O construtor de cópia é deletado: `std::seed_seq` não é copiável.

3) Constrói um `std::seed_seq` com os valores no range `[`begin`, `end`). Equivalente a inicializar `_[v](<#/doc/numeric/random/seed_seq>)_` ﻿ por padrão, seguido por for (InputIt s = begin; s != end; ++s)
` ` _[v](<#/doc/numeric/random/seed_seq>)_` ﻿.push_back(modseed(*s));, onde \\(\scriptsize \mathrm{modseed}(x)=x \mod 2^{32} \\)mod_seed(x)=x mod 232
.

Se [std::iterator_traits](<#/doc/iterator/iterator_traits>)<InputIt>::value_type não for um tipo inteiro, o programa é malformado.

Se `InputIt` não satisfizer os requisitos de [LegacyInputIterator](<#/doc/named_req/InputIterator>), o comportamento é indefinido.

4) Equivalente a seed_seq(il.begin(), il.end()). Este construtor permite a [list-initialization](<#/doc/language/list_initialization>) a partir da lista de valores de seed.

Esta sobrecarga participa da resolução de sobrecarga apenas se `T` for um tipo inteiro.

### Parâmetros

- **begin, end** — o par de iterators que denotam a sequência de seed inicial
- **il** — a sequência de seed inicial

### Exemplo

Execute este código
```cpp
    #include <iterator>
    #include <random>
    #include <sstream>
    
    int main()
    {
        std::seed_seq s1; // default-constructible
        std::seed_seq s2{1, 2, 3}; // can use list-initialization
        std::seed_seq s3 = {-1, 0, 1}; // another form of list-initialization
        int a[10] = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
        std::seed_seq s4(a, a + 10); // can use iterators
        std::istringstream buf("1 2 3 4 5"); 
        std::istream_iterator<int> beg(buf), end;
        std::seed_seq s5(beg, end); // even stream input iterators
    }
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 2180](<https://cplusplus.github.io/LWG/issue2180>) | C++11 | todos os construtores eram non-throwing | apenas a sobrecarga ([1](<#/doc/numeric/random/seed_seq/seed_seq>)) é non-throwing
[LWG 3422](<https://cplusplus.github.io/LWG/issue3422>) | C++11 | 1. a sobrecarga ([1](<#/doc/numeric/random/seed_seq/seed_seq>)) não era noexcept
2. a sobrecarga ([4](<#/doc/numeric/random/seed_seq/seed_seq>)) não era restrita | 1.tornada noexcept
2. restrita