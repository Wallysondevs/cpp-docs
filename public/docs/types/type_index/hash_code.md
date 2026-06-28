# std::type_index::hash_code

```cpp
std::size_t hash_code() const noexcept;  // (desde C++11)
```

Retorna o código hash do objeto [std::type_info](<#/doc/types/type_info>) associado. Equivalente a chamar [`type_info::hash_code`](<#/doc/types/type_info/hash_code>) diretamente.

### Parâmetros

(nenhum)

### Valor de retorno

O código hash do objeto [std::type_info](<#/doc/types/type_info>) associado.

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 2144](<https://cplusplus.github.io/LWG/issue2144>) | C++11 | `type_index::hash_code` não era exigido ser noexcept | exigido

### Veja também

[ std::hash<std::type_index>](<#/doc/types/type_index/hash>)(C++11) | suporte a hash para [`std::type_index`](<#/doc/types/type_index>)
(especialização de template de classe)