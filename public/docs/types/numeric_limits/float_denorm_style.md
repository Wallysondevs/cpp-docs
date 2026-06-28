# std::float_denorm_style

Definido no cabeçalho `<limits>`

```c
enum float_denorm_style {
denorm_indeterminate = -1,
denorm_absent = 0,
denorm_present = 1
};
```

As constantes de enumeração do tipo **std::float_denorm_style** indicam o suporte a valores subnormais por tipos de ponto flutuante.

### Constantes de enumeração

Nome | Definição
---|---
**std::denorm_indeterminate** | O suporte a valores subnormais não pode ser determinado
**std::denorm_absent** | O tipo não suporta valores subnormais
**std::denorm_present** | O tipo permite valores subnormais

### Veja também

[ has_denorm](<#/doc/types/numeric_limits/has_denorm>)[static] | identifica o estilo de desnormalização usado pelo tipo de ponto flutuante
(constante membro estática pública)