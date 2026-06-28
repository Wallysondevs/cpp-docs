# std::begin(std::valarray)

```cpp
template< class T >
/* veja abaixo */ begin( valarray<T>& v );  // (1) (desde C++11)
template< class T >
/* veja abaixo */ begin( const valarray<T>& v );  // (2) (desde C++11)
```

  
A sobrecarga de [std::begin](<#/doc/iterator/begin>) para `valarray` retorna um iterator de tipo não especificado que se refere ao primeiro elemento no array numérico. 

1) O tipo de retorno deve 

  * atender aos requisitos de [LegacyRandomAccessIterator](<#/doc/named_req/RandomAccessIterator>) [mutável](<#/doc/iterator>), 

  * modelar [`contiguous_iterator`](<#/doc/iterator/contiguous_iterator>), 

| (desde C++20)  
  
  * ter um tipo membro `value_type`, que é `T`, e 
  * ter um tipo membro `reference`, que é `T&`.

2) O tipo de retorno deve 

  * atender aos requisitos de [LegacyRandomAccessIterator](<#/doc/named_req/RandomAccessIterator>) [constante](<#/doc/iterator>), 

  * modelar [`contiguous_iterator`](<#/doc/iterator/contiguous_iterator>), 

| (desde C++20)  
  
  * ter um tipo membro `value_type`, que é `T`, e 
  * ter um tipo membro `reference`, que é `const T&`.

O iterator retornado por esta função é invalidado quando a função membro [`resize()`](<#/doc/numeric/valarray/resize>) é chamada em v ou quando o tempo de vida de v termina, o que ocorrer primeiro. 

### Parâmetros

v  |  \-  |  um array numérico   
  
### Valor de retorno

Iterator para o primeiro valor no array numérico. 

### Exceções

Pode lançar exceções definidas pela implementação. 

### Notas

Ao contrário de outras funções que aceitam argumentos `std::valarray`, `begin()` não pode aceitar os tipos de substituição (como os tipos produzidos por expression templates) que podem ser retornados de expressões envolvendo valarrays: [std::begin](<#/doc/iterator/begin>)(v1 + v2) não é portável, [std::begin](<#/doc/iterator/begin>)([std::valarray](<#/doc/numeric/valarray>)&lt;T&gt;(v1 + v2)) deve ser usado em vez disso. 

A intenção desta função é permitir que [range for loops](<#/doc/language/range-for>) funcionem com valarrays, e não fornecer semântica de container. 

### Exemplo

Execute este código
```cpp 
    #include <algorithm>
    #include <iostream>
    #include <valarray>
     
    void show(const std::valarray<int>& v)
    {
        std::for_each(std::begin(v), std::end(v), 
        {
            std::cout << c << ' ';
        });
        std::cout << '\n';
    };
     
    int main()
    {
        const std::valarray<int> x{47, 70, 37, 52, 90, 23, 17, 33, 22, 16, 21, 4};
        const std::valarray<int> y{25, 31, 71, 56, 21, 21, 15, 34, 21, 27, 12, 6};
     
        show(x); 
        show(y); 
     
        const std::valarray<int> z{x + y};
     
        for (char c : z)
            std::cout << c;
    }
```

Saída: 
```
    47 70 37 52 90 23 17 33 22 16 21 4 
    25 31 71 56 21 21 15 34 21 27 12 6 
    Hello, C++!
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
[LWG 2058](<https://cplusplus.github.io/LWG/issue2058>) | C++11  | 1. `begin()` era exigido para suportar tipos de substituição  
2. era não especificado quando os iterators retornados seriam invalidados  | 1. não exigido  
2. especificado   
  
### Veja também

[ std::end(std::valarray)](<#/doc/numeric/valarray/end2>)(C++11) | especializa [std::end](<#/doc/iterator/end>)   
(modelo de função)  