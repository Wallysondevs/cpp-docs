# std::experimental::nonesuch

Definido no cabeçalho `[<experimental/type_traits>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/type_traits&action=edit&redlink=1> "cpp/header/experimental/type traits \(page does not exist\)")`

```c
```cpp
struct nonesuch {
~nonesuch() = delete;
nonesuch(nonesuch const&) = delete;
void operator=(nonesuch const&) = delete;
};
```
```

`std::experimental::nonesuch` é um tipo de classe usado por [`std::experimental::detected_t`](<#/doc/experimental/is_detected>) para indicar falha de detecção.

`nonesuch` não possui construtor padrão ou construtor de lista de inicialização, e não é um agregado.

### Notas

`nonesuch` não pode ser construído, destruído ou copiado.

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 2960](<https://cplusplus.github.io/LWG/issue2960>) | LFTSv2 | `nonesuch` pode ser um agregado e possui uma sequência de conversão implícita de `{}` | tornado não-agregado e removida a ICS