# std::filesystem::directory_entry::operator=

```cpp
directory_entry& operator=( const directory_entry& other ) = default;  // (1) (desde C++17)
directory_entry& operator=( directory_entry&& other ) noexcept = default;  // (2) (desde C++17)
```

  
Substitui o conteúdo da entrada de diretório (caminho e atributos em cache, se houver) pelo conteúdo de `other`.

Ambos os operadores de atribuição de cópia e de movimento para `directory_entry` são padronizados (defaulted).

### Parâmetros

other  |  \-  |  outro `directory_entry`  
  
### Valor de retorno

*this

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ assign](<#/doc/filesystem/directory_entry/assign>) |  atribui conteúdo   
(função membro pública)  