# std::filesystem::path

Definido no cabeçalho `[<filesystem>](<#/doc/header/filesystem>)`

```c
class path;
```

Objetos do tipo `path` representam caminhos em um sistema de arquivos. Apenas aspectos sintáticos dos caminhos são tratados: o nome do caminho pode representar um caminho não existente ou até mesmo um que não é permitido existir no sistema de arquivos ou SO atual.

O nome do caminho possui a seguinte sintaxe:

1.  root-name (opcional): identifica a raiz em um sistema de arquivos com múltiplas raízes (como "C:" ou "//myserver"). Em caso de ambiguidade, a sequência mais longa de caracteres que forma um root-name válido é tratada como o root-name. A standard library pode definir root-names adicionais além daqueles compreendidos pela API do SO.
2.  root-directory (opcional): um separador de diretório que, se presente, marca este caminho como _absoluto_. Se estiver ausente (e o primeiro elemento diferente do root name for um nome de arquivo), então o caminho é _relativo_ e requer outro caminho como local de partida para ser resolvido para um nome de arquivo.
3.  Zero ou mais dos seguintes:

    *   file-name: sequência de caracteres que não são separadores de diretório ou separadores de diretório preferenciais (limitações adicionais podem ser impostas pelo SO ou sistema de arquivos). Este nome pode identificar um arquivo, um hard link, um symbolic link ou um diretório. Dois file-names especiais são reconhecidos:

        *   dot: o nome de arquivo consistindo de um único caractere ponto . é um nome de diretório que se refere ao diretório atual.
        *   dot-dot: o nome de arquivo consistindo de dois caracteres ponto .. é um nome de diretório que se refere ao diretório pai.

    *   directory-separators: o caractere barra / ou o caractere alternativo fornecido como `path::preferred_separator`. Se este caractere for repetido, ele é tratado como um único separador de diretório: /usr///////lib é o mesmo que /usr/lib.

Um caminho pode ser _normalizado_ seguindo este algoritmo:

1.  Se o caminho estiver vazio, pare (a forma normal de um caminho vazio é um caminho vazio).
2.  Substitua cada directory-separator (que pode consistir em múltiplas barras) por um único `path::preferred_separator`.
3.  Substitua cada caractere barra no root-name por `path::preferred_separator`.
4.  Remova cada dot e qualquer directory-separator imediatamente seguinte.
5.  Remova cada filename que não seja dot-dot imediatamente seguido por um directory-separator e um dot-dot, juntamente com qualquer directory-separator imediatamente seguinte.
6.  Se houver root-directory, remova todos os dot-dots e quaisquer directory-separators imediatamente seguintes.
7.  Se o último filename for dot-dot, remova qualquer directory-separator final.
8.  Se o caminho estiver vazio, adicione um dot (a forma normal de ./ é .).

O caminho pode ser percorrido elemento a elemento via iterators retornados pelas funções [begin()](<#/doc/filesystem/path/begin>) e [end()](<#/doc/filesystem/path/begin>), que visualizam o caminho em formato genérico e iteram sobre o root name, root directory e os elementos subsequentes de nome de arquivo (separadores de diretório são ignorados, exceto aquele que identifica o root directory). Se o último elemento no caminho for um separador de diretório, o último iterator fará a desreferência para um elemento vazio.

Chamar qualquer função membro não-const de um `path` invalida todos os iterators que se referem a elementos desse objeto.

Se o SO usa uma sintaxe _nativa_ que é diferente da sintaxe _genérica_ portátil descrita acima, as funções da biblioteca que são definidas para aceitar "formato detectado" aceitam nomes de caminho em ambos os formatos: um argumento de formato detectado é considerado no formato genérico se e somente se ele corresponder ao formato genérico, mas não for aceitável para o sistema operacional como um caminho nativo. Nesses SOs onde o formato nativo difere entre nomes de caminho de diretórios e nomes de caminho de arquivos, um nome de caminho genérico é tratado como um caminho de diretório se terminar em um separador de diretório e como um arquivo regular caso contrário.

Em qualquer caso, a classe path se comporta como se armazenasse um nome de caminho no formato nativo e convertesse automaticamente para o formato genérico conforme necessário (cada função membro especifica qual formato ela interpreta o caminho).

Em sistemas POSIX, o formato genérico é o formato nativo e não há necessidade de distinguir ou converter entre eles.

Caminhos são implicitamente conversíveis para e de [std::basic_string](<#/doc/string/basic_string>)s, o que torna possível usá-los com outras APIs de arquivo.

Os [stream operators](<#/doc/filesystem/path/operator_ltltgtgt>) usam [std::quoted](<#/doc/io/manip/quoted>) para que espaços não causem truncamento quando lidos posteriormente pelo [stream input operator](<#/doc/filesystem/path/operator_ltltgtgt>).

[Funções membro de decomposição](<#/doc/filesystem/path>) (por exemplo, [extension](<#/doc/filesystem/path/extension>)) retornam objetos `filesystem::path` em vez de objetos string como outras APIs fazem.

### Tipos Membro

Tipo | Definição
---|---
`value_type` | tipo de caractere usado pela codificação nativa do sistema de arquivos: char em POSIX, wchar_t em Windows
`string_type` | [std::basic_string](<#/doc/string/basic_string>)<value_type>
`const_iterator` | um [LegacyInputIterator](<#/doc/named_req/InputIterator>) constante com um `value_type` de `path` que atende a todos os requisitos de [LegacyBidirectionalIterator](<#/doc/named_req/BidirectionalIterator>), exceto que para dois iterators desreferenciáveis iguais `a` e `b` do tipo `const_iterator`, não há requisito de que *a e *b se refiram ao mesmo objeto. É não especificado se `const_iterator` é realmente um [LegacyBidirectionalIterator](<#/doc/named_req/BidirectionalIterator>)
`iterator` | `const_iterator`
[ format](<#/doc/filesystem/path/format>) | determina como interpretar representações string de nomes de caminho. Os seguintes enumeradores também são definidos: | Nome | Explicação
[`native_format`](<#/doc/filesystem/path/format>) | formato de nome de caminho nativo
[`generic_format`](<#/doc/filesystem/path/format>) | formato de nome de caminho genérico
[`auto_format`](<#/doc/filesystem/path/format>) | formato definido pela implementação, auto-detectado quando possível

(enum membro público)

### Constantes Membro

constexpr value_type preferred_separator[static] | separador de diretório alternativo que pode ser usado além do portátil /. No Windows, este é o caractere barra invertida \. Em POSIX, este é o mesmo caractere barra / que o separador portátil
(constante membro estática pública)

### Funções Membro

[ (construtor)](<#/doc/filesystem/path/path>) | constrói um `path`
(função membro pública)
[ (destrutor)](<#/doc/filesystem/path/~path>) | destrói um objeto `path`
(função membro pública)
[ operator=](<#/>) | atribui outro path
(função membro pública)
[ assign](<#/doc/filesystem/path/assign>) | atribui conteúdo
(função membro pública)

##### Concatenação

[ appendoperator/=](<#/doc/filesystem/path/append>) | anexa elementos ao path com um separador de diretório
(função membro pública)
[ concatoperator+=](<#/doc/filesystem/path/concat>) | concatena dois paths sem introduzir um separador de diretório
(função membro pública)

##### Modificadores

[ clear](<#/doc/filesystem/path/clear>) | apaga o conteúdo
(função membro pública)
[ make_preferred](<#/doc/filesystem/path/make_preferred>) | converte separadores de diretório para o separador de diretório preferencial
(função membro pública)
[ remove_filename](<#/doc/filesystem/path/remove_filename>) | remove o componente filename do path
(função membro pública)
[ replace_filename](<#/doc/filesystem/path/replace_filename>) | substitui o último componente do path por outro path
(função membro pública)
[ replace_extension](<#/doc/filesystem/path/replace_extension>) | substitui a extensão
(função membro pública)
[ swap](<#/doc/filesystem/path/swap>) | troca dois paths
(função membro pública)

##### Observadores de Formato

[ c_strnativeoperator string_type](<#/doc/filesystem/path/native>) | retorna a versão nativa do path
(função membro pública)
[ stringwstringu8stringu16stringu32string](<#/doc/filesystem/path/string>) | retorna o path no formato de nome de caminho nativo convertido para uma string
(função membro pública)
[ generic_stringgeneric_wstringgeneric_u8stringgeneric_u16stringgeneric_u32string](<#/doc/filesystem/path/generic_string>) | retorna o path no formato de nome de caminho genérico convertido para uma string
(função membro pública)

##### Comparação

[ compare](<#/doc/filesystem/path/compare>) | compara as representações lexicais de dois paths lexicograficamente
(função membro pública)

##### Geração

[ lexically_normallexically_relativelexically_proximate](<#/doc/filesystem/path/lexically_normal>) | converte path para a forma normal
converte path para a forma relativa
converte path para a forma próxima
(função membro pública)

##### Decomposição

[ root_name](<#/doc/filesystem/path/root_name>) | retorna o root-name do path, se presente
(função membro pública)
[ root_directory](<#/doc/filesystem/path/root_directory>) | retorna o root directory do path, se presente
(função membro pública)
[ root_path](<#/doc/filesystem/path/root_path>) | retorna o root path do path, se presente
(função membro pública)
[ relative_path](<#/doc/filesystem/path/relative_path>) | retorna o path relativo ao root path
(função membro pública)
[ parent_path](<#/doc/filesystem/path/parent_path>) | retorna o path do path pai
(função membro pública)
[ filename](<#/doc/filesystem/path/filename>) | retorna o componente filename do path
(função membro pública)
[ stem](<#/doc/filesystem/path/stem>) | retorna o componente stem do path (filename sem a extensão final)
(função membro pública)
[ extension](<#/doc/filesystem/path/extension>) | retorna o componente de extensão de arquivo do path
(função membro pública)

##### Consultas

[ empty](<#/doc/filesystem/path/empty>) | verifica se o path está vazio
(função membro pública)
[ has_root_pathhas_root_namehas_root_directoryhas_relative_pathhas_parent_pathhas_filenamehas_stemhas_extension](<#/doc/filesystem/path/has_path>) | verifica se o elemento de path correspondente não está vazio
(função membro pública)
[ is_absoluteis_relative](<#/doc/filesystem/path/is_absrel>) | verifica se [root_path()](<#/doc/filesystem/path/root_path>) identifica unicamente a localização no sistema de arquivos
(função membro pública)

##### Iterators

[ beginend](<#/doc/filesystem/path/begin>) | acesso iterator ao path como uma sequência de elementos
(função membro pública)

### Funções Não-Membro

Definido no namespace `std::filesystem`
---
[ swap(std::filesystem::path)](<#/doc/filesystem/path/swap2>)(C++17) | especializa o algoritmo [std::swap](<#/doc/utility/swap>)
(função)
[ hash_value](<#/doc/filesystem/path/hash_value>)(C++17) | calcula um valor hash para um objeto path
(função)
[ operator==operator!=operator<operator<=operator>operator>=operator<=>](<#/doc/filesystem/path/operator_cmp>)(C++17)(C++17)(ate C++20)(C++17)(ate C++20)(C++17)(ate C++20)(C++17)(ate C++20)(C++17)(ate C++20)(C++20) | compara lexicograficamente dois paths
(função)
[ operator/](<#/doc/filesystem/path/operator_slash>)(C++17) | concatena dois paths com um separador de diretório
(função)
[ operator<&lt;operator&gt;>](<#/doc/filesystem/path/operator_ltltgtgt>)(C++17) | realiza entrada e saída de stream em um path entre aspas
(função)
[ u8path](<#/doc/filesystem/path/u8path>)(C++17)(obsoleto em C++20) | cria um `path` a partir de uma fonte codificada em UTF-8
(função)

### Classes Auxiliares

Definido no namespace `std`
---
[ std::hash<std::filesystem::path>](<#/doc/filesystem/path/hash>)(C++17) | suporte a hash para `std::filesystem::path`
(especialização de template de classe)
[ std::formatter<std::filesystem::path>](<#/doc/filesystem/path/formatter>)(C++26) | suporte a formatação para `filesystem::path`
(especialização de template de classe)

### Relatórios de Defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 3657](<https://cplusplus.github.io/LWG/issue3657>) | C++17 | [`hash`](<#/doc/filesystem/path/hash>) para `path` estava desabilitado | habilitado