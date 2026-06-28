# std::basic_const_iterator&lt;Iter&gt;::operator*

```cpp
constexpr std::iter_const_reference_t<Iter> operator*() const;  // (1) (desde C++23)
constexpr const auto* operator->() const
requires std::is_lvalue_reference_v<std::iter_reference_t<Iterator>> &&
std::same_as<std::remove_cvref_t<std::iter_reference_t<Iterator>>,
value_type>;  // (2) (desde C++23)
```

Retorna uma referência ou ponteiro para a versão const do elemento atual.

1) Retorna static_cast<[std::iter_const_reference_t](<#/doc/iterator/iter_t>)&lt;Iter&gt;>(*base()).

2) Se `Iter` modela [`contiguous_iterator`](<#/doc/iterator/contiguous_iterator>), retorna [std::to_address](<#/doc/memory/to_address>)(base()); caso contrário, retorna [std::addressof](<#/doc/memory/addressof>)(*base()).

### Parâmetros

(nenhum)

### Valor de retorno

1) Referência-para-const que se refere ao elemento atual. O resultado pode ser um prvalue (por exemplo, se `*base()` for um prvalue).

2) Ponteiro-para-const que aponta para o elemento atual.

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Ver também

[ operator[]](<#/doc/iterator/basic_const_iterator/operator_at>) | acessa um elemento por índice
(função membro pública)