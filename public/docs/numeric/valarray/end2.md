# std::end(std::valarray)

```cpp
template< class T >
/* veja abaixo */ end( valarray<T>& v );  // (1) (desde C++11)
template< class T >
/* veja abaixo */ end( const valarray<T>& v );  // (2) (desde C++11)
```

  
A sobrecarga de [std::end](<#/doc/iterator/end>) para `valarray` retorna um iterator de tipo não especificado que se refere ao elemento um após o último no array numérico. 

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

Iterator para o valor um após o último no array numérico. 

### Exceções

Pode lançar exceções definidas pela implementação. 

### Observações

Ao contrário de outras funções que aceitam argumentos `std::valarray`, `end()` não pode aceitar os tipos de substituição (como os tipos produzidos por expression templates) que podem ser retornados de expressões envolvendo valarrays: [std::end](<#/doc/iterator/end>)(v1 + v2) não é portável, [std::end](<#/doc/iterator/end>)([std::valarray](<#/doc/numeric/valarray>)&lt;T&gt;(v1 + v2)) deve ser usado em vez disso. 

A intenção desta função é permitir que [range for loops](<#/doc/language/range-for>) funcionem com valarrays, e não fornecer semântica de container. 

### Exemplo

Execute este código
```cpp 
    #include <algorithm>
    #include <iostream>
    #include <valarray>
     
    int main()
    {
        const std::valarray<char> va
        {
            'H', 'e', 'l', 'l', 'o', 
            ',', ' ', 
            'C', '+', '+', '!', '\n'
        };
     
        std::for_each(std::begin(va), std::end(va),
                      { std::cout << c; });
    }
```

Saída: 
```
    Hello, C++!
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento como publicado  | Comportamento correto   
[LWG 2058](<https://cplusplus.github.io/LWG/issue2058>) | C++11  | 1. `end()` era exigido para suportar tipos de substituição  
2. era não especificado quando os iterators retornados seriam invalidados  | 1. não exigido  
2. especificado   
  
### Veja também

[ std::begin(std::valarray)](<#/doc/numeric/valarray/begin2>)(C++11) |  sobrecargas [std::begin](<#/doc/iterator/begin>)   
(modelo de função)  