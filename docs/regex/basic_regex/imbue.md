# std::basic_regex&lt;CharT,Traits&gt;::imbue

```cpp
locale_type imbue( locale_type loc );  // (desde C++11)
```

  
Substitui o locale atual por `loc`. A expressão regular não corresponde a nenhuma sequência de caracteres após a chamada.

Efetivamente chama `traits_i.imbue(loc)` onde `traits_i` é uma instância inicializada por padrão do tipo `Traits` armazenada dentro do objeto de expressão regular.

### Parâmetros

loc  |  \-  |  novo locale a ser usado   
  
### Valor de retorno

O locale antes da chamada a esta função. Efetivamente retorna o resultado da expressão `traits_i.imbue(loc)`.

### Exceções

Pode lançar exceções definidas pela implementação.

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ getloc](<#/doc/regex/basic_regex/getloc>) |  obter informações de locale   
(função membro pública)  