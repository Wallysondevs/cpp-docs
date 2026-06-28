# std::regex_traits&lt;CharT&gt;::imbue

```cpp
locale_type imbue( locale_type loc );  // (desde C++11)
```

  
Substitui a locale atual por uma cópia de loc. Se loc for diferente da locale atual, todos os dados em cache são invalidados.

Após a chamada, getloc() == loc.

### Parâmetros

loc  |  \-  |  a locale a ser imbuída   
  
### Valor de retorno

A locale atual do objeto traits.

Se `imbue()` nunca foi chamado para este objeto, então a locale global no momento da chamada é retornada. Caso contrário, a locale passada para a última chamada de `imbue()` é retornada.

### Exemplo

| Esta seção está incompleta  
Razão: sem exemplo   
  
### Veja também

[ getloc](<#/doc/regex/regex_traits/getloc>) |  obtém a locale   
(função membro pública)  