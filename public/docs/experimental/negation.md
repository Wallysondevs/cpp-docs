# std::experimental::negation

Definido no cabeçalho `[<experimental/type_traits>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/type_traits&action=edit&redlink=1> "cpp/header/experimental/type traits \(page does not exist\)")`

```c
template< class B >
struct negation;
```

  
Forma a negação lógica do type trait `B`. 

O tipo negation&lt;B&gt; é um [UnaryTypeTrait](<#/doc/named_req/UnaryTypeTrait>) com uma característica base de [std::integral_constant](<#/doc/types/integral_constant>)<bool, !bool(B::value)>. 

### Parâmetros de template

B  |  \-  |  qualquer tipo tal que a expressão bool(B::value) seja uma expressão constante válida   
  
### Template de variável auxiliar

template< class B >  
constexpr bool negation_v = negation&lt;B&gt;::value; |  |  (library fundamentals TS v2)  

  
##  Herdado de [ std::integral_constant](<#/doc/types/integral_constant>)

###  Constantes membro

value[static] |  verdadeiro se `B` tiver um membro `::value` tal que !bool(B::value) seja verdadeiro, falso caso contrário   
(constante membro estática pública)  
  
###  Funções membro

operator bool |  converte o objeto para bool, retorna value   
(função membro pública)  
operator()(C++14) |  retorna value   
(função membro pública)  
  
###  Tipos membro

Tipo  |  Definição   
---|---
`value_type` |  bool  
`type` |  [std::integral_constant](<#/doc/types/integral_constant>)<bool, value>  
  
### Possível implementação
```cpp
    template<class B>
    struct negation : std::integral_constant<bool, !bool(B::value)> {};
```  
  
---  
  
### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ negation](<#/doc/types/negation>)(C++17) |  metafunção NOT lógica   
(template de classe)  