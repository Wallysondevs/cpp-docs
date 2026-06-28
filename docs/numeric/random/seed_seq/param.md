# std::seed_seq::param

```cpp
template< class OutputIt >
void param( OutputIt dest ) const;  // (desde C++11)
```

  
Copia as sementes armazenadas para o range que começa em dest. Equivalente a [std::copy](<#/doc/algorithm/copy>)(`_[v](<#/doc/numeric/random/seed_seq>)_` ﻿.begin(),` ` _[v](<#/doc/numeric/random/seed_seq>)_` ﻿.end(), dest);. 

Se valores do tipo `result_type` não forem [graváveis](<#/doc/iterator>) em dest, o programa é malformado. 

Se `OutputIt` não satisfizer os requisitos de [LegacyOutputIterator](<#/doc/named_req/OutputIterator>), o comportamento é indefinido. 

### Parâmetros

dest  |  \-  |  o iterator inicial do range de saída   
  
### Exceções

Apenas lança as exceções lançadas pelas operações em dest. 

### Exemplo

Run this code
```
    #include <iostream>
    #include <iterator>
    #include <random>
     
    int main()
    {
        std::seed_seq s1 = {-1, 0, 1};
        s1.param(std::ostream_iterator<int>(std::cout, " "));
    }
```

Saída: 
```
    -1 0 1
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 2180](<https://cplusplus.github.io/LWG/issue2180>) | C++11  | `seed_seq::param` não lança exceções  | pode lançar exceções 