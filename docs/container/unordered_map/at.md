# std::unordered_map&lt;Key,T,Hash,KeyEqual,Allocator&gt;::at

```cpp
T& at( const Key& key );  // (1) (desde C++11)
const T& at( const Key& key ) const;  // (2) (desde C++11)
template< class K >
T& at( const K& x );  // (3) (desde C++26)
template< class K >
const T& at( const K& x ) const;  // (4) (desde C++26)
```

  
Retorna uma referência para o valor mapeado do elemento com a chave especificada. Se nenhum elemento desse tipo existir, uma exceção do tipo [std::out_of_range](<#/doc/error/out_of_range>) é lançada. 

1,2) A chave é equivalente a `key`.

3,4) A chave compara-se _equivalente_ ao valor `x`. A referência para o valor mapeado é obtida como se pela expressão `this->find(x)->second`.

A expressão `this->find(x)` deve ser bem-formada e ter comportamento bem-definido, caso contrário o comportamento é indefinido.

Essas sobrecargas participam da resolução de sobrecarga apenas se `Hash::is_transparent` e `KeyEqual::is_transparent` forem válidos e cada um denotar um tipo. Isso assume que tal `Hash` é chamável com ambos os tipos `K` e `Key`, e que o `KeyEqual` é transparente, o que, juntos, permite chamar esta função sem construir uma instância de `Key`.

### Parâmetros

key  |  \-  |  a chave do elemento a ser encontrado   
---|---|---
x  |  \-  |  um valor de qualquer tipo que pode ser comparado transparentemente com uma chave   
  
### Valor de retorno

Uma referência para o valor mapeado do elemento solicitado. 

### Exceções

1,2) [std::out_of_range](<#/doc/error/out_of_range>) se o container não tiver um elemento com a chave especificada.

3,4) [std::out_of_range](<#/doc/error/out_of_range>) se o container não tiver o elemento especificado, ou seja, se `find(x) == end()` for verdadeiro.

### Complexidade

Caso médio: constante, pior caso: linear no tamanho. 

###  Notas

Macro de teste de recurso  | Valor | Padrão | Recurso   
---|---|---|---
[`__cpp_lib_associative_heterogeneous_insertion`](<#/doc/feature_test>) | [`202311L`](<#/>) | (C++26) | Sobrecargas heterogêneas para as funções membro restantes em [containers associativos ordenados](<#/doc/container>) e [não ordenados](<#/doc/container>). ([3,4](<#/doc/container/unordered_map/at>))  
  
### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ operator[]](<#/doc/container/unordered_map/operator_at>) |  acessa ou insere o elemento especificado   
(função membro pública)  
[ find](<#/doc/container/unordered_map/find>) |  encontra elemento com chave específica   
(função membro pública)