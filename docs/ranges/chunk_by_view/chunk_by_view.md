# std::ranges::chunk_by_view&lt;V,Pred&gt;::chunk_by_view

```cpp
chunk_by_view()  
requires std::default_initializable<V> &&  
std::default_initializable<Pred>  
= default;
```
| (1) | (desde C++23) |
|---|---|
```cpp
constexpr explicit chunk_by_view( V base, Pred pred );
```
| (2) | (desde C++23) |
|---|---|
  
Constrói um `chunk_by_view`.

1) Construtor padrão. [Inicializa por valor](<#/doc/language/value_initialization>) os membros de dados subjacentes através de seus respectivos inicializadores de membro padrão:

  * a view [`_base__`](<#/doc/ranges/chunk_by_view>) via = V(),
  * o predicado binário [`_pred__`](<#/doc/ranges/chunk_by_view>) via = Pred().

2) Constrói por move os membros de dados subjacentes:

  * a view [`_base__`](<#/doc/ranges/chunk_by_view>) com std::move(base),
  * o predicado binário [`_pred__`](<#/doc/ranges/chunk_by_view>) com std::move(pred).

### Parâmetros

- **base** — a view a ser dividida
- **pred** — o objeto de função (um predicado binário) usado como critério de divisão

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo