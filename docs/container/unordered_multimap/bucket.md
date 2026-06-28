# std::unordered_multimap&lt;Key,T,Hash,KeyEqual,Allocator&gt;::bucket

```cpp
size_type bucket( const Key& key ) const;  // (1) (desde C++11)
template< typename K >
size_type bucket( const K& x ) const;  // (2) (desde C++26)
```

  
1) Retorna o índice do bucket para a chave key. Elementos (se houver) com chaves equivalentes a key são sempre encontrados neste bucket.

2) Retorna o índice do bucket para a chave que se compara _equivalente_ ao valor x. Elementos (se houver) com chaves que se comparam equivalentes a x são sempre encontrados neste bucket. Esta sobrecarga participa da resolução de sobrecarga somente se Hash::is_transparent e KeyEqual::is_transparent forem válidos e cada um denotar um tipo. Isso assume que tal `Hash` é chamável com ambos os tipos `K` e `Key`, e que o `KeyEqual` é transparente, o que, juntos, permite chamar esta função sem construir uma instância de `Key`.

O valor retornado é válido apenas para instâncias do container para as quais [bucket_count()](<#/doc/container/unordered_multimap/bucket_count>) retorna o mesmo valor (por exemplo, [rehash()](<#/doc/container/unordered_multimap/rehash>) invalida o valor obtido anteriormente). 

O comportamento é indefinido se [bucket_count()](<#/doc/container/unordered_multimap/bucket_count>) for zero. 

### Parâmetros

key  |  \-  |  o valor da chave a ser examinada   
---|---|---
x  |  \-  |  um valor de qualquer tipo que pode ser comparado transparentemente com uma chave   
  
### Valor de retorno

Índice do bucket para a chave solicitada. 

### Complexidade

Constante. 

### Notas

Macro de teste de recurso  | Valor | Padrão | Recurso   
---|---|---|---
[`__cpp_lib_associative_heterogeneous_insertion`](<#/doc/feature_test>) | [`202311L`](<#/>) | (C++26) | Sobrecargas heterogêneas para as funções membro restantes em [containers](<#/doc/container>) associativos [ordenados](<#/doc/container>) e [não ordenados](<#/doc/container>). ([2](<#/doc/container/unordered_multimap/bucket>))  
  
### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ bucket_size](<#/doc/container/unordered_multimap/bucket_size>) |  retorna o número de elementos em um bucket específico   
(função membro pública)  