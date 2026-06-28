# std::text_encoding::aliases

```cpp
constexpr aliases_view aliases() const noexcept;  // (desde C++26)
```

  
Retorna um range não vazio do tipo [`text_encoding::aliases_view`](<#/doc/text/text_encoding/aliases_view>) contendo os aliases de *this se ele representa uma codificação de caracteres registrada conhecida. Caso contrário, retorna um range vazio do tipo `text_encoding::aliases_view`.

### Parâmetros

(nenhum)

### Valor de retorno

Um [`view`](<#/doc/ranges/view>) contendo aliases da codificação de caracteres registrada conhecida representada por *this; caso contrário, um range vazio.

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   