# std::filesystem::swap(std::filesystem::path)

Definido no cabeçalho `[<filesystem>](<#/doc/header/filesystem>)`

```c
void swap( std::filesystem::path& lhs, std::filesystem::path& rhs ) noexcept;
```

Troca o estado de lhs com o de rhs. Efetivamente chama lhs.swap(rhs).

### Parâmetros

- **lhs, rhs** — caminhos cujos estados devem ser trocados

### Valor de retorno

(nenhum)

### Veja também

[ swap](<#/doc/filesystem/path/swap>) | troca dois caminhos
(função membro pública)