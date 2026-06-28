# operator==(std::filesystem::file_status)

```cpp
friend bool operator==( const file_status& lhs, const file_status& rhs ) noexcept;  // (desde C++20)
```

  
Verifica se dois valores `file_status` são iguais, ou seja, os tipos e permissões representados por eles são os mesmos, respectivamente. 

Esta função não é visível para a [busca não qualificada](<#/doc/language/unqualified_lookup>) ou [busca qualificada](<#/doc/language/qualified_lookup>) comum, e só pode ser encontrada pela [busca dependente de argumento](<#/doc/language/adl>) quando std::filesystem::file_status é uma classe associada dos argumentos. 

O operador `!=` é [sintetizado](<#/doc/language/default_comparisons>) a partir de `operator==`. 

### Parâmetros

lhs, rhs  |  \-  |  Valores `file_status` para comparar   
  
### Valor de retorno

lhs.type() == rhs.type() && lhs.permissions() == rhs.permissions()

### Ver também

[ type](<#/doc/filesystem/file_status/type>) | obtém ou define o tipo do arquivo   
(função membro pública)  
[ permissions](<#/doc/filesystem/file_status/permissions>) | obtém ou define as permissões do arquivo   
(função membro pública)