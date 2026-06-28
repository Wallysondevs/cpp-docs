# std::locale::combine

template< class Facet >  
locale combine( const locale& other ) const;

  
Constrói um objeto locale que é uma cópia de *this, exceto pelo facet do tipo `Facet`, que é copiado de other.

O programa é malformado se Facet não for um [facet](<#/doc/locale/locale/facet>) ou se for um facet qualificado como volatile.

### Valor de retorno

O novo locale, sem nome.

### Exceções

[std::runtime_error](<#/doc/error/runtime_error>) se other não implementar `Facet`.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <locale>
     
    int main()
    {
        const double number = 1000.25;
        std::cout << "\"C\" locale: " << number << '\n';
        std::locale loc = std::locale()
            .combine<std::numpunct<char>>(std::locale("en_US.UTF8"));
        std::cout.imbue(loc);
        std::cout << "\"C\" locale with en_US numpunct: " << number << '\n';
    }
```

Saída: 
```
    "C" locale: 1000.25
    "C" locale with en_US numpunct: 1,000.25
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 14](<https://cplusplus.github.io/LWG/issue14>) | C++98  | `locale::combine` era não-const  | tornado const   
[LWG 436](<https://cplusplus.github.io/LWG/issue436>) | C++98  | não estava claro se `Facet` pode ser cv-qualificado  | pode ser const-qualificado, mas não volatile-qualificado   
  
### Veja também

[ (construtor)](<#/doc/locale/locale/locale>) | constrói um novo locale   
(função membro pública)  